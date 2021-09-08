import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Orderhistory extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        Delivered: true,
    }

    componentDidMount = () => {
        // this.getallorder_api();
    }

    change_Status = (status) => {

    }



    render() {

        const history = this.props.props_data ? this.props.props_data.map((data, i) => (
            <>
                <tr id="dataid73" role="row" className="odd" key={i}>
                    <td className="sorting_1">{i + 1}</td>
                    <td>{data.created_at}</td>
                    <td>{data.first_name} {data.last_name}</td>
                    {/* <td>CHOCOLATE CAKE</td> */}
                    <td>{data.order_number}</td>
                    <td>{data.address}</td>
                    <td>
                        {data.status === "complete" ?
                            <span className="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span>
                            : data.status === "cancel" ?
                                <span className="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span>
                                : ""}
                        {/* status === "cancel" */}
                        {data.status === "complete" ?
                            <button type="button" className="btn btn-success" onClick={(e) => this.change_Status(Number(data.refund_status) === 1 ? 0 : 1)}> {Number(data.refund_status) === 1 ? "Active" : "In-active"} Active </button>
                            : ""}
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
        return (
            <div>
                <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr role="row">
                            <th className="sorting" style={{ width: "9px" }}>#</th>
                            <th className="sorting" style={{ width: "50px" }}>Created at</th>
                            <th className="sorting" style={{ width: "58px" }}>User Name</th>
                            <th className="sorting" style={{ width: "78px" }}>Order Number</th>
                            <th className="sorting" style={{ width: "44px" }}>location</th>
                            <th className="sorting" style={{ width: "84px" }}>Order Status</th>
                            <th className="sorting" style={{ width: "41px" }}>Action</th></tr>
                    </thead>
                    <tbody>
                        {history}
                    </tbody>
                </table>
            </div>
        )
    }
}
