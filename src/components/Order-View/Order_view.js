import React, { Component } from 'react'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import { BaseURL } from '../base_url';

export default class Order_view extends Component {
    state = {
        orderdetail: '',
        checkstatus: false,
        changestatus: false,
        success: false,
        message: "",
        checkstatus1: false,
    }

    componentDidMount = () => {
        this.getorderdetail_api();
    }

    getorderdetail_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-order-view/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({

                    orderdetail: result.data.data[0]
                })
            })
            .catch((err) => {

                console.log(err.response);

            });
    }

    changeproductStatus_api = () => {

        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("item_id", this.state.itemid);
        data.append("status", this.state.itemstatus);

        axios
            .post(`${BaseURL}/api/product_change_status`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "update Status") {
                    this.setState({
                        success: res.data.message,
                        checkstatus: false
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getorderdetail_api();
                    this.props.getorder_api();
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    change_Status_id = (id, e) => {
        this.setState({
            itemid: id,
            itemstatus: e.target.value,
            checkstatus: true,
        })
    }

    onCancel = () => {
        this.setState({
            checkstatus: false,
            changestatus: false,
            checkstatus1: false,
        })
    }

    change_Status = (status, product_id, request_id) => {
        const token = localStorage.getItem("token");
        const formdata = new FormData();

        formdata.append("refund_button_status", status);
        formdata.append("request_id", request_id);
        formdata.append("item_id", product_id);
        formdata.append("status_change", "item");
        axios
            .post(`${BaseURL}/api/refund_button_status`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Refund Button Updated Successfully") {
                    this.setState({
                        success: true,
                        message: res.data.message
                    })
                    this.getorderdetail_api();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onSuccess = () => {
        this.setState({
            success: false,
            message: "",
            success_message: "",
        })
    }


    refund_api = () => {
        debugger
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("item_id", this.state.id);
        data.append("refund_request", this.state.Status);
        data.append("request_id", this.state.request_id);

        axios
            .post(`${BaseURL}/api/refund`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {

                console.log(res);
                this.setState({
                    success_message: res.data.message,
                    success: true,
                    checkstatus1:false
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    refund_function = (id, request_id, Status) => {
        this.setState({
            id: id,
            Status: Status,
            request_id: request_id,
            checkstatus1: true

        })
    }

    render() {
        // console.log('aaaaaaaaaa',this.props?.match?.params?.id);
        // console.log('bbbbbbb', this.state.orderdetail?.items);

        const tableData = this.state.orderdetail ? this.state.orderdetail.items.map((x, i) => (
            // console.log()
            <tr class="ponsiv">
                <td class="center">{i + 1}</td>
                <td class="left strong">{x.inventory_name}</td>
                <td class="left">${x.price}.00</td>
                {/* <td class="left">{x.quantity} kg</td> */}
                <td class="center">{x.quantity}</td>
                <td class="center"> {x.category_name}</td>
                <td class="right">${x.quantity * x.price}.00</td>
                <td class="right">{x.samar_basket === '1' ? "Samar Basket" : x.shipping_outside === '1' ? "Order Now" : x.special_orders === '1' ? "Special Order" : ""}</td>
                <td class="center">{x.delivery_type}</td>
                <td class="center"> {x.delivery_date}</td>
                {x.product_status === 'complete' ? <span class="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span> :
                    x.product_status === 'cancel' ? <span class="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span> :

                        <td>
                            <label class="show_Solo">
                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                                    class="form-control form-control-sm one"
                                    value={x.status}
                                    // onChange={this.handleChange11}
                                    onChange={(e) => this.change_Status_id(x.id, e)}>
                                    <option value="processing">Processing </option>
                                    <option value="complete">Delivered</option>
                                    <option value="cancel">Cancel</option>
                                </select>
                            </label>
                        </td>

                }
                <td>
                    {!x.item_refund_msg ?
                        <>
                            {x.product_status === 'complete' ?
                                x.refund_status ? <button type="button" className="btn btn-success" onClick={(e) => this.refund_function(x.id, x.request_id, "item")}> {x.refund_status} </button> :
                                    <button type="button" className={`btn btn-${Number(x.refund_button_status) === 1 ? "success" : "warning"} `} onClick={(e) => this.change_Status(Number(x.refund_button_status) === 1 ? 0 : 1, x.id, x.request_id)}> {Number(x.refund_button_status) === 1 ? "Active" : "In-active"}   </button>

                                :
                                ""}
                        </>
                        :
                        <button type="button" className="btn btn-success" >  {x.refund_status} </button>}


                </td>

            </tr>
        ))
            :
            ""
        const { checkstatus, changestatus, success, message, checkstatus1, success_message } = this.state;

        return (
            <div>
                {checkstatus1 ? (
                    <SweetAlert
                        warning
                        showCancel
                        cancelBtnText="No"
                        confirmBtnText="Yes"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        title="Are you sure you want to update the status?"
                        onConfirm={(e) => this.refund_api(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {checkstatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        cancelBtnText="cancel"
                        confirmBtnText="Yes, update it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        title="Are you sure you want to update the status?"
                        onConfirm={(e) => this.changeproductStatus_api(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {changestatus ? (
                    <SweetAlert
                        success
                        title="Updated successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}

                {success ? (
                    <SweetAlert
                        success
                        title="Updated successfully"
                        onConfirm={this.onSuccess}
                    >
                        {success_message}
                    </SweetAlert>)
                    : ""}

                <div className="page">
                    {/* <!-- Main Navbar--> */}
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div class="container-fluid">
                            <section class="viw_page">
                                <div class="card" id="printDiv">
                                    <div class="card-header">
                                        Invoice
                                        <strong> {this.state.orderdetail ? this.state.orderdetail.order_number : ""} </strong>
                                        <span class="float-right"> <strong>Status:</strong> {this.state.orderdetail ? this.state.orderdetail.status : ""}
                                        </span>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mb-4">
                                            <div class="col-sm-8">
                                                <h6 class="mb-3">To:</h6>
                                                <div>
                                                    <strong>{this.state.orderdetail ? this.state.orderdetail.first_name : ""} {this.state.orderdetail ? this.state.orderdetail.last_name : ""}</strong>
                                                </div>
                                                <div>Address: {this.state.orderdetail ? this.state.orderdetail.address : ""}</div>
                                                <div>Email: {this.state.orderdetail ? this.state.orderdetail.email : ""}</div>
                                                <div>Phone: +{this.state.orderdetail ? this.state.orderdetail.phone : ""}</div>
                                            </div>
                                        </div>
                                        <div class="table-responsive-sm">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th class="center">#</th>
                                                        <th>Item</th>
                                                        <th class="right">Unit Cost</th>
                                                        {/* <th class="center">Weight</th> */}
                                                        <th class="center">Qty</th>
                                                        <th class="center">Category Type</th>
                                                        <th class="right">Total</th>
                                                        <th class="center">Product Type</th>
                                                        <th class="center">Delivery Type</th>
                                                        <th class="center">Delivery Date</th>
                                                        <th class="right">Action</th>
                                                        <th class="right">Refund </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableData}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-5">
                                            </div>
                                            <div class="col-lg-4 col-sm-5 ml-auto">
                                                <table class="table table-clear">
                                                    <tbody>
                                                        <tr>
                                                            <td class="left">
                                                                <strong>Tax</strong> (%)
                                                            </td>
                                                            <td class="right">
                                                                <strong>{this.state.orderdetail ? this.state.orderdetail.discount : ""}%</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left">
                                                                <strong>Delivery Charge</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong>${this.state.orderdetail ? this.state.orderdetail.delivery_charges : ""}.00</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left">
                                                                <strong>Total</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong>${this.state.orderdetail ? this.state.orderdetail.total : ""}.00</strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary float-right" id="doPrint">
                                    <i class="fa fa-print" aria-hidden="true"></i> Print
                                </button>
                            </section>
                            <Footers />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
