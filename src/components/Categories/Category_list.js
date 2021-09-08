import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';

import Pagination from '../pagination/pagination';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files'
export default class Category_list extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        category_id: '',
        deletesuccess: '',
        deletemess_err: '',

        deleteValid: false,
        successs: false,
        addcatsuccess: false,
        changestatus: false,
        changestatusdone: false,
        loading: false,
    }

    componentDidMount = () => {
        this.getcategory_api();
    }
    onFilesChange = (files) => {
        this.colse_mess();
        // console.log(files)
        this.setState({
            image: files[0],
            image_url: URL.createObjectURL(files[0]),
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }
    getcategory_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/get-categories", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                debugger
                console.log("result?.data?.message", result?.data?.message);
                if (result?.data?.message === "Something Went Wrong") {
                    this.setState({
                        message: result?.data?.message
                    })
                }
                console.log("result", result);
                if (result.data.data) {

                    this.setState({
                        usercount: result.data.data.length,
                        userlist: result.data.data,
                        message: "",
                        loading: true,

                    })
                }
                // console.log("result", result.data.data);
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                })
                console.log(err.response);
            });
    }


    delete_category = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/delete_category/${this.state.id_d}`, {
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
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getcategory_api();
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        deletemess_err: res.data.message
                    })
                }
                if (res.data.message === "Please Delete Items First") {
                    this.setState({
                        deletemess_err: res.data.message
                    })
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    change_cat_status = () => {
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("cat_id", this.state.c_id);
        data.append("status", this.state.c_status);
        axios
            .post("http://134.209.157.211/champbakery/public/api/change_cat_status", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log('===================', res);
                this.setState({
                    changestatusdone: true,
                })
                this.getcategory_api();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    addcategory_api = (e) => {

        e.preventDefault();
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("category_name", this.state.category_name);
        data.append("category_image", this.state.image);
        axios
            .post(`http://134.209.157.211/champbakery/public/api/${this.state.category_id ? `edit_category/${this.state.category_id}` : `add_category`}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Record Added successfully !") {
                    this.setState({
                        success: res.data.message,
                        addcatsuccess: true,
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getcategory_api();

                }
                if (res.data.message === "Record updated successfully !") {
                    this.setState({
                        success: res.data.message,
                        addcatsuccess: true,
                    })
                    this.getcategory_api();
                }
                if (res.data.message === "You have not update anything") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.data.category_image || res.data.data.category_name) {
                    this.setState({
                        banner_image_err: res.data.data.category_image || res.data.data.category_name
                    })
                }

                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
    handleChange1 = (e) => {
        this.colse_mess();
        console.log("e.target.file", e.target.value);
        this.setState({
            category_name: e.target.value
        })
    }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }
    edit_category = (id) => {
        const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : ""
        console.log(img);
        this.setState({
            category_id: id,
            image_url: img[0].category_image,
            category_name: img[0].category_name
        })
    }

    dismiss = () => {
        this.setState({
            category_id: '',
            image_url: '',
            category_name: '',
        })
    }

    colse_mess = () => {
        this.setState({
            banner_image_err: "",
            mess_err: "",
            success: "",
            deletesuccess: '',
            deletemess_err: '',
        })
    }
    change_cat_id = (id, status) => {
        this.setState({
            c_id: id,
            c_status: status,
            changestatus: true,
        })
    }

    deleteget_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }
    onCancel = () => {
        if (this.state.addcatsuccess === true || this.state.successs === true) {
            window.location.reload();
        }
        this.setState({
            deleteValid: false,
            successs: false,
            addcatsuccess: false,
            changestatus: false,
            changestatusdone: false,
        })
    }
    render() {
        const { message, loading, userlist } = this.state;
        // console.log("message", message ? message : "" , loading ? loading :"" , userlist);
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = loading === true ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        const dataFilter = currentPosts ? currentPosts.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.category_name.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        console.log("dataFilter", dataFilter);
        const tableData = dataFilter ? dataFilter.map((x, i) => (


            <tr id="dataid14" role="row" className="odd" key={i}>
                <td className="sorting_1">{i + 1}</td>
                <td><img src={x.category_image} className="img-fluid" style={{ maxHeight: "50px" }} alt="" /></td>
                <td>{x.category_name}</td>
                <td>{x.created_at}</td>
                <td>
                    <button className="badge badge-success px-2" onClick={(e) => this.change_cat_id(x.id, x.status === '1' ? '0' : '1')} style={{ color: "#fff" }}>{x.status === '1' ? "Available" : "Un-Available"}</button>
                </td>
                <td>
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_category(x.id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteget_id(x.id)}>
                        Delete
                    </button>

                </td>
            </tr>


        ))
            :
            ""
        const { deleteValid, successs, addcatsuccess, changestatus, changestatusdone } = this.state;

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
                        onConfirm={(e) => this.delete_category(e)}
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
                {addcatsuccess ? (
                    <SweetAlert
                        success
                        title="Success"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}


                {changestatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, Change it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure?"
                        onConfirm={(e) => this.change_cat_status(e)}
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
                <div className="page">
                    {/* <!-- Main Navbar--> */}

                    <Headers />

                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}

                        <Sidebars />

                        <div className="content-inner">
                            <div className="container-fluid">
                                <div className="model">
                                    {/* <div className="modfrl">
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                                        Add Category
                                    </button>
                                    </div> */}
                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Add New Category</h4>
                                                    <button type="button" className="close" data-dismiss="modal" onClick={this.colse_mess} onClick={this.dismiss}>&times;</button>
                                                </div>
                                                {this.state.banner_image_err || this.state.mess_err ?
                                                    <div className="alert alert-danger alert-block">
                                                        <button type="button" onClick={this.colse_mess} className="close">×</button>
                                                        <strong>
                                                            {this.state.banner_image_err ? this.state.banner_image_err : ""}
                                                            {this.state.mess_err ? this.state.mess_err : ""}
                                                        </strong>
                                                    </div>
                                                    : " "}
                                                {this.state.success ?
                                                    <div className="alert alert-success alert-block">
                                                        <button type="button" onClick={this.colse_mess} className="close">×</button>
                                                        <strong>
                                                            {this.state.success ? this.state.success : ""}

                                                        </strong>
                                                    </div>
                                                    : " "}
                                                <form onSubmit={(e) => this.addcategory_api(e)}>
                                                    <div className="modal-body">
                                                        <input type="hidden" className="form-control" id="id" name="id" value="10" />
                                                        <input type="hidden" className="form-control" id="old_img" name="old_img" value="slider-609674e103916.jpg" />
                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="get_title"> Category</label>
                                                            <input type="text" className="form-control" id="get_title" name="category_name" placeholder="Category Title" value={this.state.category_name ? this.state.category_name : ""} onChange={this.handleChange1} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="image" >image</label>
                                                            <Files
                                                                className='form-control po'
                                                                onChange={this.onFilesChange}
                                                                onError={this.onFilesError}
                                                                accepts={['image/png', '.pdf', '.jpg', '.jpeg', 'audio/*']}
                                                                multiple
                                                                maxFileSize={10000000}
                                                                minFileSize={0}
                                                                clickable
                                                            >
                                                                {this.state.image_url ? <img src={this.state.image_url} alt={this.state.image_url} style={{ height: "50px" }} /> : "click to upload"}
                                                            </Files>
                                                            {/* <input type="file" className="form-control" name="image" id="image" accept="image/*" /> */}
                                                        </div>
                                                        <div className="gallerys"></div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-secondary" data-dismiss="modal" onClick={this.colse_mess} onClick={this.dismiss}>Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="dashboard-counts no-padding-bottom io">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow">
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-4">
                                                <Link to="/Category-List" >
                                                    {/* <a href="Categories.html"> */}
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Categories</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.usercount}</h2>
                                                        </div>
                                                        <span className="float-right display-5"><i className="fa fa-list-alt"></i></span>
                                                    </div>
                                                    {/* </a> */}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <section className="slip_text">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow one">
                                        <div className="col-sm-5">
                                            <div className="anny_text">
                                                <div className="input-group">
                                                    <div className="form-outline one">
                                                        <input type="search" id="form1" className="form-control" placeholder="Search Category Name" onChange={(e) => this.searchSpace(e)} />
                                                    </div>
                                                    <button type="button" className="btn btn-primary five">
                                                        <i className="fa fa-search-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="anny_text_one">
                                                <div className="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" />
                                                        <input className="sumfive" type="submit" value="Submit" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                            <section className="client no-padding-bottom yop">
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
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <div className="catregoru">
                                                                <h6>All Category</h6>
                                                            </div>
                                                            <div className="modfrl">
                                                                <span>
                                                                    <div className="form-outline one">
                                                                        <input type="search" id="form1" className="form-control" placeholder="Search Category Name" onChange={(e) => this.searchSpace(e)} />
                                                                    </div>
                                                                </span>
                                                                <span><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                                                                    Add Category
                                                                </button></span>
                                                            </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "53px" }}>#</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "111px" }}>Image</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Category Name: activate to sort column ascending" style={{ width: "220px" }}>Category Name</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "244px" }}>Created at</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style={{ width: "144px" }}>Status</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "147px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        <div className="row" style={{ width: "100%" }}>

                                                            <div className="col-md-6" >
                                                                <h3 className="total_rec"> Show once  </h3>
                                                                <select id="dropdown_custom" onChange={this.handleChange} >
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
                                                        {/* <div className="row">
                                                            <div className="col-sm-12 col-md-5">
                                                                <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 75 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" className="page-link">Previous</a></li><li className="paginate_button page-item"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" className="page-link">1</a></li><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" className="page-link">2</a><li className="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="8" tabindex="0" className="page-link">Next</a></li></ul>



                                                        </div></div></div> */}
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
