import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files';
import Pagination from '../pagination/pagination';

import {BaseURL} from '../base_url';


export default class Blog extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        deleteValid: false,
        content: '',
        heading: '',
        blog_id:'',
        successs: false,
        addblogsuccess: false,
        deletesuccess:'',
    }

    componentDidMount = () => {
        this.getblog_api();
    }
    onFilesChange = (files) => {
        if (files[0]) { 
            this.setState({
                image: files[0],
                image_url: URL.createObjectURL(files[0]),
            })
        }

    }
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }


    getblog_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/getblog`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    usercount: result.data.data.length,
                    userlist: result.data.data ? result.data.data : ''
                })
                

            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    addblog_api = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("content", this.state.content);
        data.append("heading", this.state.heading);

        data.append("image", this.state.image);
        axios
            .post(`${BaseURL}/api/${this.state.blog_id ? `edit_blog/${this.state.blog_id}` : `add_blogs`}`, data, {

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {


                if (res.data.message === "blog Added Successfully") {
                    this.setState({
                        success: res.data.message,
                        addblogsuccess: true
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getblog_api();

                }
                if (res.data.message === "Blog Updated Successfully") {
                    this.setState({
                        success: res.data.message,
                        addblogsuccess: true
                    })
                    this.getblog_api();
                }
                if (res.data.message === "Somthing Went Wrong") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.data.heading || res.data.data.content) {
                    this.setState({
                        banner_image_err: res.data.data.heading || res.data.data.content
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    delete_blog = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/delete_blog/${this.state.id_d}`, {
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
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getblog_api();

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
    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    handleChange1 = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    deleteblog_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }
    edit_blog = (id) => {
        const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : ""

        this.setState({
          blog_id: id,
          image_url: img[0].image,
          content: img[0].content,
          heading: img[0].heading
        })
    }

    dismiss = () => {
        this.setState({
            content: '',
            heading: '',
            blog_id:'',
            image_url: '',
        })
    }

    onCancel = () => {
        if (this.state.addblogsuccess === true) {
            window.location.reload();
        }
        
        this.setState({
            deleteValid: false,
            successs: false,
            addblogsuccess: false,
        })
    }
    get_content = (content) => {
        const cont = content.slice(0, 300);
        return <> {cont}... </>;
    }

    blog = (e) => {
        const filter_data = this.state.userlist ? this.state.userlist?.filter((x) => x.id === e ) : [] ;
        this.setState({
            dec_pop : filter_data[0].content ,
        })
    }
    render() {
        const {dec_pop }=this.state;

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        // const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
        //     if (!this.state.search) return x;
        //     else if (this.state.search) return x.heading.toLowerCase().includes(this.state.search.toLowerCase())

        // }) : []
        const tableData = currentPosts ? currentPosts.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td>{x.heading}</td>
                <td  >{this.get_content(x.content)} 

                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#blogdescription" data-backdrop="static" data-keyboard="false" onClick={(e) => this.blog(x.id)}>
                        View More
                    </button>

                </td>
                <td><img src={x.image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.image} /></td>
                <td>{x.created_at}</td>
                <td>
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModalblog" data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_blog(x.id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteblog_id(x.id)}>
                        Delete
                    </button>

                </td>
            </tr>


        ))
            : ""
         
        const { deleteValid, successs, addblogsuccess } = this.state;
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
                        onConfirm={(e) => this.delete_blog(e)}
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


                {addblogsuccess ? (
                    <SweetAlert
                        success
                        title="Blog added successfully"
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
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalblog" data-backdrop="static" data-keyboard="false">
                                            Add Blog
                                        </button>
                                        <div className="modal" id="myModalblog">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Add New Blog</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.dismiss}><span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <form id="add_banner" onSubmit={(e) => this.addblog_api(e)}>
                                                        <div className="modal-body">


                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="heading">Headings:</label>
                                                                <input type="text" className="form-control" id="heading" name="heading" value={this.state.heading} placeholder="heading" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="content">Content:</label>
                                                                <textarea className="form-control" id="content" name="content" value={this.state.content} placeholder="content ....." onChange={(e) => this.handleChange1(e)} required ></textarea>
                                                                {/* <input type="text" className="form-control" id="content" name="content" placeholder="content" onChange={(e) => this.handleChange1(e)} required /> */}
                                                            </div>
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


                                                            <div className="modal-footer">
                                                                <button className="btn btn-secondary" data-dismiss="modal" onClick={this.dismiss}>Close</button>
                                                                <button type="submit" className="btn btn-primary">Save</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="model">
                                        <div className="modal" id="blogdescription">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Blog Description</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.dismiss}><span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <span>{dec_pop}</span>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button className="btn btn-secondary" data-dismiss="modal" onClick={this.dismiss}>Close</button>  
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </section>
                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>All Blog</h6>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc"  style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Headings</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Content</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Image</th>
                                                                    <th className="sorting" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" style={{ width: "143px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        {length > 10 ? 
                                                        <div className="row" style={{ width: "100%" }}>

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
                                                        </div>
                                                        :""}
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
