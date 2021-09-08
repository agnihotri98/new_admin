import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";

import { BaseURL } from '../../base_url';


export default class Order_listTab extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        checkstatus: false,
        changestatus: false,
        loading: false,
        userlist: [],
        message: "",

    }

    changeStatus_api = () => {

        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("request_id", this.state.orderid);
        data.append("status", this.state.orderstatus);

        axios
            .post(`${BaseURL}/api/change_status`, data, {
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
            orderid: id,
            orderstatus: e.target.value,
            checkstatus: true,
        })
    }

    onCancel = () => {
        this.setState({
            checkstatus: false,
            changestatus: false,
        })
    }

    change_Status = (status, product_id, request_id) => {
        debugger
        const token = localStorage.getItem("token");
        const formdata = new FormData();

        formdata.append("refund_button_status", status);
        formdata.append("request_id", request_id);
        formdata.append("item_id", product_id);
        formdata.append("status_change", "order");
        axios
            .post(`${BaseURL}/api/refund_button_status`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
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


    render() {

        const data = this.props.props_data;
        const order_d = data ? data.map((x, i) => (
            <>
                <tr id="dataid73" role="row" class="odd" key={i}>
                    <td class="sorting_1">{i + 1}</td>
                    <td>{x.created_at}</td>
                    <td>{x.first_name} {x.last_name}</td>
                    {/* <td>CHOCOLATE CAKE</td> */}
                    <td>{x.order_number}</td>
                    <td>{x.address}</td>
                    <td>
                        <label class="show_Solo">
                            <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                                class="form-control form-control-sm one"
                                value={x.status}
                                onChange={(e) => this.change_Status_id(this.props.props_data[i]?.id, e)}>
                                <option value="processing">Processing </option>
                                <option value="complete">Delivered</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <span>
                            <Link to={`/Order-Detail/${x.id}`} >
                                <span className="badge badge-warning">View</span>
                            </Link>
                        </span>
                    </td>
                    {/* <td>
                        <span> */}
                    {/* {Number(x.refund_btn_status) === 0 ?
                                    <span className="badge badge-warning"> Refund</span>
                                :
                                ""
                            } */}
                    {/* <button type="button" className={`btn btn-${Number(x.refund_btn_status) === 1 ? "success" : "warning"} `} onClick={(e) => this.change_Status(Number(x.refund_btn_status) === 1 ? 0 : 1, x.id, x.request_id)}> {Number(x.refund_btn_status) === 1 ? "Active" : "In-active"}   </button> */}
                    {/* </span>
                    </td> */}

                </tr>
            </>
        )) : []

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
                        onConfirm={(e) => this.changeStatus_api(e)}
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


                <div>
                    <table class="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                        <thead>
                            <tr role="row">
                                <th class="sorting" style={{ width: "9px" }}>#</th>
                                <th class="sorting" style={{ width: "50px" }}>Created at</th>

                                <th class="sorting" style={{ width: "58px" }}>User Name</th>
                                {/* <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style={{ width: "58px" }}>Orders Name</th> */}
                                <th class="sorting" style={{ width: "78px" }}>Order Number</th>

                                <th class="sorting" style={{ width: "44px" }}>location</th>

                                <th class="sorting" style={{ width: "84px" }}>Order Status</th>
                                <th class="sorting" style={{ width: "41px" }}>Action</th>

                                {/* <th class="sorting" style={{ width: "41px" }}> Refund </th> */}

                            </tr>

                            {/* refund_button_status */}
                        </thead>
                        <tbody>
                            {order_d}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
