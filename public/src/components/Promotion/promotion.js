import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files';
import Pagination from '../pagination/pagination';

import {BaseURL} from '../base_url';


export default class promotion extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        coupon_code: '',
        coupon_type: '',
        coupon_value: '',
        expiry_date: '',
        description: '',
        user_id: '',
        country_id: '',
        state_id: '',
        city: '',
        deleteValid: false,
        successs: false,
        addcouponsuccess: false,
    }

    componentDidMount = () => {
        this.getcoupon_api();
        this.getusers_api();
        this.getcountry_api();
    }


    onFilesChange = (files) => {
        if (files[0]) {
            console.log(files)
            this.setState({
                image: files[0],
                image_url: URL.createObjectURL(files[0]),
            })
        }

    }
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }
    getusers_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/user-list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    userlistss: result.data.data
                })
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    getcountry_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-Country`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log("result", result);

                this.setState({
                    countries: result.data.data
                })
                // this.getstate_api();
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    getstate_api = (id) => {

        // console.log('sadassa',id);
        const token = localStorage.getItem("token");

        // const data = new FormData();
        // data.append("country_id",  id);
        axios
            .get(`${BaseURL}/api/get-state/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    states: result.data.data
                })
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }

    getcity_api = (stateid) => {
        const token = localStorage.getItem("token");
        // const data = new FormData();
        // data.append("country_id", this.state.country_id);
        // data.append("state_id", this.state.state_id);
        axios
            .get(`${BaseURL}/api/get-city/${this.state.country_id}/${stateid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    cities: result.data.data
                })
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    getcoupon_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/getCoupons", {
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
    addcoupon_api = (e) => { 
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("coupon_code", this.state.coupon_code);
        data.append("coupon_type", this.state.coupon_type);
        data.append("coupon_value", this.state.coupon_value);
        data.append("expiry_date", this.state.expiry_date);
        data.append("description", this.state.description);
        data.append("country_id", this.state.country_id);
        data.append("state_id", this.state.state_id);
        data.append("city_id", this.state.city_id);
        data.append("user_id", this.state.user_id);

        data.append("coupon_image", this.state.image);
        axios
            .post("http://134.209.157.211/champbakery/public/api/add_coupon", data, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Coupon Added Successfully") {
                    this.setState({
                        success: res.data.message,
                        addcouponsuccess: true,
                    }) 
                    this.getcoupon_api();
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.data.image || res.data.data.inventory_name) {
                    this.setState({
                        banner_image_err: res.data.data.image || res.data.data.inventory_name
                    })
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    delete_coupon = (id) => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/delete_coupon/${this.state.id_d}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message === "Record deleted successfully !") {
                    this.setState({
                        deletesuccess: res.data.message,
                        successs: true,
                    }) 
                    this.getcoupon_api();
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        deletemess_err: res.data.message
                    })
                }

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

    handleChangecountry = (e) => {
        this.setState({
            country_id: e.target.value
        })
        this.getstate_api(e.target.value);
    }

    handleChangestate = (e) => {
        this.setState({
            state_id: e.target.value
        })
        this.getcity_api(e.target.value);
    }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    handleChange1 = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    deleteget_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }
    onCancel = () => {
        if (this.state.addcouponsuccess === true || this.state.successs === true) {
            window.location.reload();
        }
        this.setState({
            deleteValid: false,
            successs: false,
            addcouponsuccess: false,
        })
    }
    render() {

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        // const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
        //     if (!this.state.search) return x;
        //     else if (this.state.search) return x.category_name.toLowerCase().includes(this.state.search.toLowerCase())

        // }) : [] 

        const tableData = currentPosts ? currentPosts.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td>{x.coupon_code}</td>
                <td>{x.coupon_type}</td>
                <td>{x.coupon_value}</td>
                <td>{x.expiry_date}</td>
                <td>{x.description}</td>
                <td><img src={x.coupon_image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.coupon_image} /></td>
                <td>{x.created_at}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteget_id(x.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        )) : []

        const { deleteValid, successs, addcouponsuccess } = this.state;
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
                        onConfirm={(e) => this.delete_coupon(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {successs ? (
                    <SweetAlert
                        success
                        title="deleted successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}
                {addcouponsuccess ? (
                    <SweetAlert
                        success
                        title="Success"
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
                            <section className="dashboard-counts no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="model">
                                        {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                            Add Promotion Banner
                                        </button> */}
                                        <div className="modal" id="myModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Add New Promotion Banner</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <form id="add_banner" onSubmit={(e) => this.addcoupon_api(e)}>
                                                        <div className="modal-body">

                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="image">Select Item images:</label>
                                                                <Files
                                                                    className='form-control po'
                                                                    onChange={this.onFilesChange}
                                                                    onError={this.onFilesError}
                                                                    accepts={['image/png', '.jpg', '.jpeg', '.pdf', 'audio/*']}
                                                                    multiple
                                                                    maxFileSize={10000000}
                                                                    minFileSize={0}
                                                                    clickable
                                                                >
                                                                    {this.state.image_url ? <img src={this.state.image_url} alt={this.state.image_url} style={{ height: "50px" }} /> : "click to upload"}
                                                                </Files>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="coupon_code">Coupon code:</label>
                                                                <input type="text" className="form-control" id="coupon_code" name="coupon_code" placeholder="Coupon code" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="coupon_type">Coupon Type:</label>
                                                                <select name="coupon_type" className="form-control" id="coupon_type" onChange={this.handleChange1} required>
                                                                    <option value="">Select Type</option>
                                                                    <option value="Percent">Percent</option>
                                                                    <option value="Fixed">Fixed</option>
                                                                </select>
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="coupon_value">Coupon Value:</label>
                                                                <input type="Number" className="form-control" id="coupon_value" name="coupon_value" placeholder="Coupon Value" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="description">Description:</label>
                                                                <input type="text" className="form-control" id="description" name="description" maxlength="500" placeholder="You can add only 150 words..." onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="expiry_date">Expiry Date:</label>
                                                                <input type="date" className="form-control" id="expiry_date" name="expiry_date" placeholder="Expiry Date" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="user_id" >Users:</label>
                                                                <select name="user_id" className="form-control" id="user_id" onChange={this.handleChange1}>
                                                                    <option value="">Select User</option>
                                                                    {this.state.userlistss ? this.state.userlistss.map((x, i) => (
                                                                        <option value={x.id}>{x.first_name} {x.last_name}</option>
                                                                    )) : ""}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="state_id" >Country:</label>
                                                                <select name="country_id" className="form-control" id="country_id" onChange={this.handleChangecountry} required>
                                                                    <option value="">Select Country</option>
                                                                    {this.state.countries ? this.state.countries.map((x, i) => (
                                                                        <option value={x.country_id}>{x.name}</option>
                                                                    )) : ""}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="state_id" >State:</label>
                                                                <select name="state_id" className="form-control" id="state_id" onChange={this.handleChangestate} >
                                                                    <option value="">Select state</option>
                                                                    {this.state.states ? this.state.states.map((x, i) => (
                                                                        <option value={x.id}>{x.name}</option>
                                                                    ))  : ""}
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="city_id" >City:</label>
                                                                <select name="city_id" className="form-control" id="city_id" onChange={this.handleChange1} >
                                                                    <option value="">Select City</option>
                                                                    {this.state.cities ? this.state.cities.map((x, i) => (
                                                                        <option value={x.id}>{x.name}</option>
                                                                    )): ""}
                                                                </select>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="submit" className="btn btn-primary">Save</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="client no-padding-bottom ub">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <div className="promiz">
                                                                <h6>All Promotion Banner</h6>
                                                            </div>
                                                            <div className="bnner">
                                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                                                    Add Promotion Banner
                                                                </button>

                                                            </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc" style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting"  style={{ width: "338px" }}>Coupon Code</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Coupon Type</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Coupon Value</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Expiry Date</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Description</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Coupon Image</th>
                                                                    <th className="sorting" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" style={{ width: "143px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        <div className="row" style={{ width: "100%" }}>
                                                            {length > 10 ?
                                                                <>
                                                                    <div className="col-md-6" >
                                                                        <h3 className="total_rec"> Show once  </h3>
                                                                        <select id="dropdown_custom" onChange={this.handleChange} value={this.state.postsPerPage}>
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
                                                                </>
                                                                : ""}
                                                        </div>
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
