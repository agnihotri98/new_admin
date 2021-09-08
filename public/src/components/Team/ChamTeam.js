import React, { Component } from 'react'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files';
import Pagination from '../pagination/pagination';
export default class ChamTeam extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        deleteValid: false,
        description: '',
        manager_name: '',
        name: '',
        team_id: '',
        successs: false,
        addTeamsuccess: false,
        deletesuccess: '',

    }

    componentDidMount = () => {
        this.getTeam_api();
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
    getTeam_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/getTeam", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    usercount: result.data.data.length,
                    userlist: result.data.data
                })
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    addTeam_api = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("description", this.state.description);
        data.append("manager_name", this.state.manager_name);
        data.append("name", this.state.name);
        data.append("image", this.state.image);
        axios
            .post(`http://134.209.157.211/champbakery/public/api/${this.state.team_id ? `editTeam/${this.state.team_id}` : `addTeam`}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Team manager Added Successfully") {
                    this.setState({
                        success: res.data.message,
                        addTeamsuccess: true
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getTeam_api();
                }
                if (res.data.message === "Team Updated Successfully") {
                    this.setState({
                        success: res.data.message,
                        addTeamsuccess: true
                    })
                    this.getTeam_api();
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
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    deleteTeam = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/deleteTeam/${this.state.id_d}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message === "Record deleted successfully !") {
                    this.setState({
                        deletesuccess: res.data.message,
                        successs: true
                    }) 
                    this.getTeam_api();
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
    deleteTeam_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }
    edit_team = (id) => {
        const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : ""

        this.setState({
            team_id: id,
            image_url: img[0].image,
            description: img[0].description,
            manager_name: img[0].manager_name,
            name: img[0].name,
        })
    }
    dismiss = () => {
        this.setState({
            description: '',
            manager_name: '',
            team_id: '',
            image_url: '',
            name: '',
        })
    }
    onCancel = () => {
        if (this.state.addTeamsuccess === true || this.state.successs === true) {
            window.location.reload();
        }
        this.setState({
            deleteValid: false,
            successs: false,
            addTeamsuccess: false,
        })
    }


    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        // const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
        //     if (!this.state.search) return x;
        //     else if (this.state.search) return x.heading.toLowerCase().includes(this.state.search.toLowerCase())

        // }) : []
        // console.log("dataFilter", dataFilter);
        const tableData = currentPosts ? currentPosts.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td>{x.name}</td>
                <td>{x.manager_name}</td>
                <td>{x.description}</td>
                <td><img src={x.image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.image} /></td>
                <td>{x.created_at}</td>
                <td>
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModalteam" data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_team(x.id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteTeam_id(x.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        ))
            : ""

        const { deleteValid, successs, addTeamsuccess } = this.state;

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
                        onConfirm={(e) => this.deleteTeam(e)}
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

                {addTeamsuccess ? (
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
                                        {/* <div className="leop">
                                       <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalteam" data-backdrop="static" data-keyboard="false">
                                            Add Team
                                        </button>
                                       </div> */}
                                        <div className="modal" id="myModalteam">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Add New Team</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" onClick={this.dismiss}>×</span>
                                                        </button>
                                                    </div>
                                                    <form id="add_banner" onSubmit={(e) => this.addTeam_api(e)}>
                                                        <div className="modal-body">
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="name"> name:</label>
                                                                <input type="text" className="form-control" id="name" value={this.state.name} name="name" placeholder="Name" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>

                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="manager_name">Manager name:</label>
                                                                <input type="text" className="form-control" id="manager_name" value={this.state.manager_name} name="manager_name" placeholder="heading" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="content">Description:</label>
                                                                <textarea className="form-control" id="description" value={this.state.description} name="description" maxlength="500" placeholder="You can add only 150 words..." onChange={(e) => this.handleChange1(e)} required ></textarea>
                                                                 
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
                                </div>
                            </section>
                            <section className="client no-padding-bottom onb">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <div className="bine">
                                                                <h6>All Second Slider</h6>
                                                            </div>
                                                            <div className="leop">
                                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalteam" data-backdrop="static" data-keyboard="false">
                                                                    Add Team
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc" style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting"  style={{ width: "170px" }}>Name</th>
                                                                    <th className="sorting" style={{ width: "170px" }}>Manager Name</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Description</th>
                                                                    <th className="sorting" style={{ width: "271px" }}>Image</th>
                                                                    <th className="sorting" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" style={{ width: "170px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
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
                                                                <div className="homepio">
                                                                    <Pagination postsPerPage={this.state.postsPerPage}
                                                                        totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} />
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
                            <Footers />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
