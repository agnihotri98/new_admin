import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Orderhistory extends Component {
    render() {
        // console.log("===================", this.props.props_data?.length);

        var indents = [];
        for (var i = 0; i < this.props.props_data.length; i++) {
            // console.log("===================", this.props.props_data[i].address);

            indents.push(
                <tr id="dataid73" role="row" class="odd" key={i}>
                    <td class="sorting_1">{i + 1}</td>
                    <td>{this.props.props_data[i].created_at}</td>
                    <td>{this.props.props_data[i].first_name} {this.props.props_data[i].last_name}</td>
                    {/* <td>CHOCOLATE CAKE</td> */}
                    <td>{this.props.props_data[i].order_number}</td>
                    <td>{this.props.props_data[i].address}</td>
                    <td>
                        {this.props.props_data[i].status === "complete" ?
                            <span class="badge badge-success px-2" style={{ color: "#fff" }}>Delivered</span>
                            :
                            <span class="badge badge-danger px-2" style={{ color: "#fff" }}>Cancel</span>
                        }
                    </td>
                    <td>
                        <span>
                            <Link to={`/Order-Detail/${this.props.props_data[i].id}`} >

                                <span className="badge badge-warning">View</span>

                            </Link>

                        </span>
                    </td>
                </tr>

            );
        }
        return (
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

                        {indents}
                    </tbody>
                </table>
            </div>
        )
    }
}
