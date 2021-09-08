import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Pagination from '../pagination/pagination';
export default class Review_list extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        deleteValid: false,
        deletesuccess: '',
        deletemess_err: '',
        successs: false,
    }

    componentDidMount = () => {
        this.getratings_api();
    }

    getratings_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/rating-list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    usercount: result.data.data.length,
                    userlist: result.data.data
                })
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    delete_review = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/delete_review/${this.state.id_d}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Record deleted successfully !") {
                    this.setState({
                        deletesuccess: res.data.message,
                        successs: true
                    })
                    this.getratings_api();
                }

                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        deletemess_err: res.data.message
                    })
                }

                console.log(res);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    handleChange = (e) => {
        this.setState({
            postsPerPage: e.target.value
        })
    }


    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }
    colse_mess = () => {
        this.setState({
            deletesuccess: '',
            deletemess_err: '',
        })
    }

    deleteget_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }


    onCancel = () => {
        this.setState({
            deleteValid: false,
            successs: false,
        })
    }
    render() {

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) :"";
        const length = this.state.userlist ? this.state.userlist.length : "";

        const dataFilter = currentPosts ? currentPosts.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.category_name.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        console.log("dataFilter", dataFilter);
        const tableData = dataFilter ? dataFilter.map((x, i) => (

            <tr id="dataid16" role="row" className="odd" key={i}>
                <td className="sorting_1">{i + 1}</td>
                <td className="sorting_1"><img src={x.image} alt="test" style={{ width: "100px" }} /></td>
                <td>{x.first_name} {x.last_name}</td>
                <td><i className="fa fa-star checked"></i> {x.rating_star}</td>
                <td>{x.rating_comment}</td>
                <td>{x.created_at}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteget_id(x.id)}>
                        Delete
                    </button>
                </td>
            </tr>


        ))
        :""
        const { deleteValid, successs } = this.state;

        return (
            <div>

                {deleteValid ? (

                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure?"
                        onConfirm={(e) => this.delete_review(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn

                    >
                       
                    </SweetAlert>
                ) : ""}



                {successs ? (
                    <SweetAlert
                        success
                        title="Are you sure?"
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
                        <div className="content-inner">

                            <header className="page-header">
                                <div className="row page-titles mx-0">
                                    <div className="col p-md-0">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/" >Dashboard</Link></li>
                                            <li className="breadcrumb-item active"><Link to="/Review-List" >All Reviews</Link></li>
                                        </ol>
                                        <h3>Reviews</h3>
                                    </div>
                                </div>
                            </header>
                            <section className="dashboard-counts no-padding-bottom_io">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow">
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-3">
                                                {/* <a href="#"> */}
                                                <Link to="/Review-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Reviews</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.usercount}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-star"></i></span>
                                                    </div>
                                                </Link>
                                                {/* </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {this.state.deletemess_err ?
                                <div className="alert alert-danger alert-block">
                                    <button type="button" onClick={this.colse_mess} className="close">×</button>
                                    <strong>
                                        {this.state.deletemess_err ? this.state.deletemess_err : ""}
                                    </strong>
                                </div>
                                : " "}
                            {this.state.deletesuccess ?
                                <div className="alert alert-success alert-block">
                                    <button type="button" onClick={this.colse_mess} className="close">×</button>
                                    <strong>
                                        {this.state.deletesuccess ? this.state.deletesuccess : ""}
                                    </strong>
                                </div>
                                : " "}
                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>All Reviews</h6>
                                                        </div>


                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">

                                                            <thead>

                                                                <tr role="row"><th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "49px" }}>#</th>
                                                                    <th className="sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Profile Image: activate to sort column ascending" style={{ width: "82px" }} aria-sort="descending">Items Image</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Name: activate to sort column ascending" style={{ width: "214px" }}>Name</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Rating: activate to sort column ascending" style={{ width: "107px" }}>Rating</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Comment: activate to sort column ascending" style={{ width: "180" }}>Comment</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "232px" }}>Created at</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "107px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>

                                                        </table>
                                                        <div classNameName="row" style={{ width: "100%" }}>

                                                            <div classNameName="col-md-6" >
                                                                <h3 classNameName="total_rec"> Show once  </h3>
                                                                <select id="dropdown_custom" onChange={this.handleChange} >
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="80">80</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </div>
                                                            <div classNameName="col-md-6" >
                                                            <div className="homepiop">
                                                                <Pagination postsPerPage={this.state.postsPerPage}
                                                                 totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} />
                                                                 </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 75 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" className="page-link">Previous</a></li><li className="paginate_button page-item"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" className="page-link">1</a></li><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" className="page-link">2</a><li className="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="8" tabindex="0" className="page-link">Next</a></li></ul></div></div></div> */}
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
