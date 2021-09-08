import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
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
            .post("http://134.209.157.211/champbakery/public/api/change_status", data, {
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
    render() {

        const data = this.props.props_data;
            const a =  data ? data.map((x, i) => (
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
                                // onChange={this.handleChange11}
                                onChange={(e) => this.change_Status_id(this.props.props_data[i]?.id, e)}>
                                {/* <option value="accepted">Accepted</option> */}
                                <option value="processing">Processing </option>
                                {/* <option value="onready">On Ready </option>
                                <option value="ongoing">Ongoing</option> */}
                                <option value="complete">Delivered</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </label>



                        {/* {this.props.props_data[i].status === "complete" ?
                            <span class="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span>
                            :
                            <span class="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span>
                        } */}
                    </td>
                    <td>
                        <span>
                            <Link to={`/Order-Detail/${x.id}`} >

                                <span className="badge badge-warning">View</span>

                            </Link>

                        </span>
                    </td>
                </tr>
            </>
        )) : []
//  console.log("=====----------", a);
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
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "9px" }}>#</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "50px" }}>Created at</th>

                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style={{ width: "58px" }}>User Name</th>
                                {/* <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style={{ width: "58px" }}>Orders Name</th> */}
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Number: activate to sort column ascending" style={{ width: "78px" }}>Order Number</th>

                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Status: activate to sort column ascending" style={{ width: "44px" }}>location</th>

                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Change Order Status: activate to sort column ascending" style={{ width: "84px" }}>Order Status</th>
                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "41px" }}>Action</th></tr>
                        </thead>



                        <tbody>

                        {a}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
