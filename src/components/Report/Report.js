import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from "axios";

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Pagination from '../pagination/pagination';

import { CSVLink, CSVDownload } from "react-csv";
export default class Report extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        search_type: '',
        start_date: '',
        end_date: '',
        userlist:'',
        checkdatas: '',
    }
    componentDidMount = () => {

    }
    reportSearch_api = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("search_type", this.state.search_type);
        data.append("start_date", this.state.start_date);
        data.append("end_date", this.state.end_date);
        axios
            .post("http://134.209.157.211/champbakery/public/api/searchreport", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                this.setState({
                    userlist: res.data.data,
                    checkdatas: res.data.message,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange1 = (e) => {
        this.setState({
            postsPerPage: e.target.value
        })
    }
    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    render() {
        console.log("tttttttttttttttttt", this.state.checkdatas);
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        // console.log("dataFilter", currentPosts);
        const tableData = currentPosts ? currentPosts.map((x, i) => (
            <>
                {this.state.checkdatas === 'User List' ?
                    <tr id="dataid53" role="row" className="even" key={i}>
                        <td className="">{i + 1}</td>
                        <td>{x.first_name}</td>
                        <td>{x.email}</td>
                        <td>{x.phone}</td>
                        <td>{x.created_at}</td>

                    </tr>
                    : []}

                {this.state.checkdatas === 'Product List' ?
                    <tr id="dataid53" role="row" className="even" key={i}>
                        <td className="">{i + 1}</td>
                        <td>{x.category_name}</td>
                        <td>{x.inventory_name}</td>
                        <td><img src={x.image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.image} /></td>
                        <td>{x.created_ats}</td>

                    </tr>
                    : []}

            </>
        ))
            : []

        return (
            <div>
                <div className="page">
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        <Sidebars />
                        <div class="content-inner">
                            <section class="client no-padding-bottom_helop">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="series_lo">
                                                <div class="series_one">
                                                    <div class="series_five">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <h4 class="card-title">Report</h4>
                                                                <div class="deteid">
                                                                    <form id="add_banner" onSubmit={(e) => this.reportSearch_api(e)}>
                                                                        <div className="modal-body">
                                                                            <div className="row">
                                                                                <div className="col-md-2">
                                                                                    <div className="form-group">
                                                                                        <label className="slider_lit col-form-label" for="search_type">Select Search Type :</label>
                                                                                        <select name="search_type" className="form-control" id="search_type" onChange={this.handleChange} required>
                                                                                            <option value="">Select Type</option>
                                                                                            <option value="get_user">Get Users</option>
                                                                                            <option value="get_saleproduct">Get Sale Products</option>
                                                                                            {/* <option value="not_purchase_user">Get Not Purchased of any Users</option> */}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="form-group">
                                                                                        <label className="slider_lit col-form-label" for="start_date">From Date :</label>
                                                                                        <input type="date" className="form-control" id="start_date" name="start_date" placeholder="Start Date" onChange={(e) => this.handleChange(e)} required />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="form-group">
                                                                                        <label className="slider_lit col-form-label" for="end_date">To Date :</label>
                                                                                        <input type="date" className="form-control" id="end_date" name="end_date" placeholder="End Date" onChange={(e) => this.handleChange(e)} required />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <div className="form-group">
                                                                                        <input className="sumfive mt-4" type="submit" value="Submit" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="client no-padding-bottom_juop">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="series_lo">
                                                <div class="series_one">
                                                    <div class="series_five">
                                                       <div className="eideod">
                                                       <div class="series_three">
                                                            {this.state.checkdatas === 'User List' ?<h6>User List</h6> : ''}
                                                            {this.state.checkdatas === 'Product List' ?<h6>Product List</h6> : ''}
                                                        </div>
                                                        {this.state.checkdatas !== '' ? 
                                                        <>
                                                           <div class="askhd">
                                                           <CSVLink data={this.state.userlist} >Download me</CSVLink>
                                                            <CSVDownload data={this.state.userlist} target="_blank" /> 
                                                           </div>
                                                        </> 
                                                        : []}
                                                       </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                {this.state.checkdatas === 'User List' ?
                                                                    <tr role="row"><th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending" style={{ width: "58px" }}>#</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "338px" }}>User Name</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Email</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Phone Number</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "258px" }}>Created at</th>

                                                                    </tr>
                                                                    : []
                                                                }
                                                                {this.state.checkdatas === 'Product List' ?
                                                                    <tr role="row"><th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending" style={{ width: "58px" }}>#</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "338px" }}>Product Category</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Product Name</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Product Image</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "258px" }}>Created at</th>
                                                                    </tr>
                                                                    : []
                                                                }
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        {this.state.checkdatas !== '' ?
                                                            <div className="row" style={{ width: "100%" }}>
                                                                <div className="col-md-6" >
                                                                    <h3 className="total_rec"> Show once  </h3>
                                                                    <select id="dropdown_custom" onChange={this.handleChange1} >
                                                                        <option value="10">10</option>
                                                                        <option value="20">20</option>
                                                                        <option value="40">40</option>
                                                                        <option value="80">80</option>
                                                                        <option value="100">100</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-6" >
                                                                    <Pagination postsPerPage={this.state.postsPerPage} totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} />
                                                                </div>
                                                            </div>
                                                            : []
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <Footers />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
