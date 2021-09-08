import React, { Component } from 'react'
import axios from "axios";
// import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';

export default class Order_view extends Component {

    state = {
        orderdetail: '',
        checkstatus: false,
        changestatus: false,
    }
    componentDidMount = () => {
        this.getorderdetail_api();
    }
    getorderdetail_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/get-order-view/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({

                    orderdetail: result.data.data[0]
                })
                console.log("result0000000000", result.data.data);

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
            .post("http://134.209.157.211/champbakery/public/api/product_change_status", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {

                console.log(res);
                if (res.data.message === "update Status") {
                    this.setState({
                        success: res.data.message,
                        changestatus: true
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
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
        })
      }
    render() {
        // console.log('aaaaaaaaaa',this.props?.match?.params?.id);
        // console.log('bbbbbbb', this.state.orderdetail?.items);

        const tableData = this.state.orderdetail ? this.state.orderdetail.items.map((x, i) => (
            // console.log()
            <tr class="ponsiv">
                <td class="center">1</td>
                <td class="left strong">{x.inventory_name}</td>
                <td class="left">${x.price}.00</td>
                {/* <td class="left">{x.quantity} kg</td> */}
                <td class="center">{x.quantity}</td>
                <td class="center"> {x.category_name}</td>
                <td class="right">${x.quantity * x.price}.00</td>
                <td class="right">{x.samar_basket === '1' ? "Samar Basket" : x.shipping_outside === '1' ? "Order Now" : x.special_orders === '1' ? "Special Order" : ""}</td>
                <td class="center">{x.delivery_type}</td>
                <td class="center"> {x.delivery_date}</td>
                {x.product_status === 'complete' ?  <span class="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span> :
                x.product_status === 'cancel' ? <span class="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span>:
                
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
            </tr>
        ))
            :
            ""
            const { checkstatus, changestatus } = this.state;

        return (
            <div>
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

                <div className="page">
                    {/* <!-- Main Navbar--> */}
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div class="container-fluid">
                            <section class="viw_page_one">
                                <div class="card" id="printDiv">
                                    <div class="card-header">
                                        Invoice
                                        <strong> {this.state.orderdetail ? this.state.orderdetail.order_number:""} </strong>
                                        <span class="float-right"> <strong>Status:</strong> {this.state.orderdetail?this.state.orderdetail.status :""}
                                        </span>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mb-4">
                                            <div class="col-sm-8">
                                                <h6 class="mb-3">To:</h6>
                                                <div>
                                                    <strong>{this.state.orderdetail?this.state.orderdetail.first_name:""} {this.state.orderdetail?this.state.orderdetail.last_name:""}</strong>
                                                </div>
                                                <div>Address: {this.state.orderdetail?this.state.orderdetail.address:""}</div>
                                                <div>Email: {this.state.orderdetail?this.state.orderdetail.email:""}</div>
                                                <div>Phone: +{this.state.orderdetail?this.state.orderdetail.phone:""}</div>
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
                                                                <strong>{this.state.orderdetail?this.state.orderdetail.discount:""}%</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left">
                                                                <strong>Delivery Charge</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong>${this.state.orderdetail?this.state.orderdetail.delivery_charges:""}.00</strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left">
                                                                <strong>Total</strong>
                                                            </td>
                                                            <td class="right">
                                                                <strong>${this.state.orderdetail?this.state.orderdetail.total:""}.00</strong>
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
