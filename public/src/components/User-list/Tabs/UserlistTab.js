import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";


export default class UserlistTab extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        changestatus: false,
        changestatusdone: false,
    }
    useractivation = () => {
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("id", this.state.userid);
        data.append("status", this.state.userstatus);
        axios
            .post("http://134.209.157.211/champbakery/public/api/useractivation", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('===================', res);
                this.setState({
                    changestatusdone: true,
                })
                this.props.getusers_api();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    change_status_id = (id, status) => {
        this.setState({
            userid: id,
            userstatus: status,
            changestatus: true,
        })
    }
    onCancel = () => {
        this.setState({
            changestatus: false,
            changestatusdone: false,
        })
    }

    render() {

        const data = this.props.props_data;
        console.log('====================',data);
        const a = data ? data.map((x, i) => (
            <>

                <tr id="dataid430" role="row" className="odd" key={i}>
                    <td className="closing">{i + 1}</td>
                    <td><img src={x.image} className="sorting_1" style={{ maxHeight: "50px" }} alt="" /></td>
                    <td>{x.first_name} {x.last_name}</td>
                    {
                    x.role === "WholeSaler" || x.role === "Wholesaler"?
                    <td>{x.username}</td> 
                    : ""
                    }
                    <td>{x.email}</td>
                    <td>{x.phone}</td>
                    <td>{x.login_type}</td>
                    <td>
                        <button className="badge badge-success px-2" onClick={(e) => this.change_status_id(x.id, x.status === 1 ? 0 : 1)} style={{ color: "#fff" }}>{x.status === 1 ? "Active" : "Inactive"}</button>
                    </td>
                    <td>{x.created_at}</td>
                    <td>
                        <Link to={`/User-view/${x.id}`} >
                            <span className="badge badge-warning">View</span>
                        </Link>
                    </td>
                </tr>
            </>
        )) : []
        const { changestatus, changestatusdone } = this.state;
        return (
            <div>
                 {changestatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, Change it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure you want to change it?"
                        onConfirm={(e) => this.useractivation(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {changestatusdone ? (
                    <SweetAlert
                        success
                        title="You have changed status successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}
                <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr role="row">
                            <th className="sorting_one" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="#: activate to sort column ascending" style={{ width: "9px" }} >#</th>
                            <th className="sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Profile Image: activate to sort column ascending" style={{ width: "82px" }} aria-sort="descending">Profile Image</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style={{ width: "125px" }}>Name</th>
                            {this.props.role === 'Wholesaler' ? 
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style={{ width: "125px" }}>Company Name</th>
                            :
                            ""
                            }
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style={{ width: "223px" }}>Email</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Mobile: activate to sort column ascending" style={{ width: "108px" }}>Mobile</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Login With: activate to sort column ascending" style={{ width: "43px" }}>Login With</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="status" style={{ width: "43px" }}> Status</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "50px" }}>Created at</th>
                            <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "41px" }}>Action</th></tr>
                    </thead>
                    <tbody>

                        {a}

                    </tbody>
                </table>
            </div>
        )
    }
}
