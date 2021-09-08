import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { BaseURL } from '../../base_url';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class Orderhistory extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        Delivered: true,
        checkstatus: false,
        success: false,
    }

    componentDidMount = () => {
        // this.getallorder_api();
    }

    change_Status = (status, id) => {
        const token = localStorage.getItem("token");
        const formdata = new FormData();

        formdata.append("refund_button_status", status);
        formdata.append("request_id", id);
        formdata.append("item_id", 0);
        formdata.append("status_change", "order");
        axios
            .post(`${BaseURL}/api/refund_button_status`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // console.log(res.data);
                if (res.data.message === "Refund Button Updated Successfully") {
                    this.setState({
                        success: true,
                        message: res.data.message
                    })
                    this.props.getallorder_api();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    refund_api = (id, Status) => {
        const token = localStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("refund_request", this.state.Status);
        formdata.append("request_id", this.state.id);
        formdata.append("item_id", 0);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${BaseURL}/api/refund`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // this.setState({
                //     success: true,
                //     message: "Refund Converted As Coupon"
                // })
                if (result.message === "Refund Converted As Coupon") {
                    this.setState({
                        success: true,
                        message: result.message
                    })
                }
                this.props.getallorder_api();
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    onCancel = () => {
        this.setState({
            checkstatus: false,
            success: false,
        })
    }

    refund_function = (id, Status) => {
        this.setState({
            id: id,
            Status: Status,
            checkstatus: true

        })
    }

    render() {

        const history = this.props.props_data ? this.props.props_data.map((data, i) => (
            <>
                <tr id="dataid73" role="row" className="odd" key={i}>
                    <td className="sorting_1">{i + 1}</td>
                    <td>{data.created_at}</td>
                    <td>{data.first_name} {data.last_name}</td>

                    <td>{data.order_number}</td>
                    <td>{data.address}</td>
                    <td>
                        {data.status === "complete" ?
                            <span className="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span>
                            : data.status === "cancel" ?
                                <span className="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span>
                                : ""}

                    </td>
                    <td>
                        {data.order_refund_msg ? <button type="button" className="btn btn-success" > {data.order_refund_msg} </button> :
                        <>
                        {data.status === "complete" ?
                            data.order_refund_status ?
                                <button type="button" className="btn btn-success" onClick={(e) => this.refund_function(data.id, "order")}> {data.order_refund_status} </button>
                                :
                                <button type="button" className={Number(data.refund_btn_status) === 1 ? `btn btn-success` : `btn btn-warning`} onClick={(e) => this.change_Status(Number(data.refund_btn_status) === 1 ? 0 : 1, data.id)}> {Number(data.refund_btn_status) === 1 ? "Active" : "In-active"} </button>
                            : ""}
                            </>
                            }

                        {data.order_refund_status ? <p> </p> : ""}
                    </td>
                    <td>
                        <span>
                            <Link to={`/Order-Detail/${data.id}`} >
                                <span className="badge badge-warning">View</span>
                            </Link>
                        </span>
                    </td>
                </tr>
            </>
        )) : []

        const { checkstatus, success, message } = this.state;
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
                        title={`Are you sure?`}
                        onConfirm={(e) => this.refund_api(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {success ? (
                    <SweetAlert
                        success
                        title={message}
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}


                <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr role="row">
                            <th className="sorting" style={{ width: "9px" }}>#</th>
                            <th className="sorting" style={{ width: "50px" }}>Created at</th>
                            <th className="sorting" style={{ width: "58px" }}>User Name</th>
                            <th className="sorting" style={{ width: "78px" }}>Order Number</th>
                            <th className="sorting" style={{ width: "44px" }}>location</th>
                            <th className="sorting" style={{ width: "84px" }}>Order Status</th>
                            <th className="sorting" style={{ width: "41px" }}>Refund</th>
                            <th className="sorting" style={{ width: "41px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history}
                    </tbody>
                </table>
            </div>
        )
    }
}
