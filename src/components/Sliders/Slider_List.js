import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Pagination from '../pagination/pagination';
import Files from 'react-files'


export default class Slider_List extends Component {
  state = {
    usercount: '0',
    currentPage: 1,
    postsPerPage: 10,
    image: '',
    slider_id: '',
    mess_err: '',
    success: '',
    deleteValid: false,
    deletesuccess: '',
    deletemess_err: '',
    successs: false,
    addslidersuccess: false,
    changestatus: false,
    changestatusdone: false,
    heading: "",
    name: "",
    description: ""
  }

  componentDidMount = () => {
    this.getslider_api();
  }

  onFilesChange = (files) => {
    this.colse_mess();

    console.log(files)
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

  getslider_api = () => {

    const token = localStorage.getItem("token");
    axios
      .get("http://134.209.157.211/champbakery/public/api/banners-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        this.setState({
          usercount: result.data.data.length,
          userlist: result.data.data
        })
        console.log("result", result.data.data);

      })
      .catch((err) => {

        console.log(err.response);

      });
  }

  delete_slider = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://134.209.157.211/champbakery/public/api/delete_banner/${this.state.id_d}`, {
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
          this.getslider_api();
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

  change_slider_status = () => {
    // console.log('=================', id);
    // console.log('=================', status);
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("slider_id", this.state.s_id);
    data.append("status", this.state.s_status);
    axios
      .post("http://134.209.157.211/champbakery/public/api/change_slider_status", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('===================', res);
        this.setState({
          changestatusdone: true,
        })
        this.getslider_api();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  addslider_api = (e) => {
    // debugger
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    // data.set("total", this.totalInput.value);
    data.append("banner_image", this.state.image);
    data.append("banner_heading", this.state.heading);
    data.append("banner_name", this.state.name);
    data.append("description", this.state.description);
    axios
      .post(`http://134.209.157.211/champbakery/public/api/${this.state.slider_id ? `edit_banner/${this.state.slider_id}` : `add-banner`}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.banner_image);
        console.log(res.data.message);
        if (res.data.message === "Add Banner successfully!" || res.data.message === "You have same image updated") {
          this.setState({
            success: res.data.message,
            addslidersuccess: true,
          })
          // this.props.history.push('/Slider-List')
          // window.location.reload();
          this.getslider_api();

        }
        if (res.data.message === "Record updated successfully !") {
          this.setState({
            success: res.data.message,
            addslidersuccess: true,
          })
          this.getslider_api();
        }

        if (res.data.message === "Something Went Wrong") {
          this.setState({
            mess_err: res.data.message
          })
        }
        if (res.data?.data.banner_image) {
          this.setState({
            banner_image_err: res.data.data.banner_image
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

  handleChange1 = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  edit_slider = (id) => {
    const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : ""
    console.log("img=================", img);
    this.setState({
      slider_id: id,
      image_url: img[0].banner_image,
      description: img[0].description,
      name: img[0].banner_name,
      heading: img[0].banner_heading
    })
  }

  paginate = (number) => {
    this.setState({
      currentPage: number
    })
  }

  dismiss = () => {
    this.setState({
      description: '',
      name: '',
      slider_id: '',
      image_url: '',
      heading: '',
    })
  }
  colse_mess = () => {
    this.setState({
      banner_image_err: "",
      mess_err: "",
      success: '',
      deletesuccess: '',
      deletemess_err: '',
    })
  }
  get_id = (id) => {
    this.setState({
      id_d: id,
      deleteValid: true,
    })
  }

  change_slider_id = (id, status) => {
    this.setState({
      s_id: id,
      s_status: status,
      changestatus: true,
    })
  }


  onCancel = () => {
    if (this.state.addslidersuccess === true || this.state.successs === true) {
      window.location.reload();
    }
    this.setState({
      deleteValid: false,
      successs: false,
      addslidersuccess: false,
      changestatus: false,
      changestatusdone: false,
    })
  }
  render() {
    // console.log("vxcvvvvvvvvvvv", this.state.slider_id);
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
    const length = this.state.userlist ? this.state.userlist.length : "";

    const dataFilter = currentPosts ? currentPosts.filter((x, i) => {
      if (!this.state.search) return x;
      else if (this.state.search) return x.status.toLowerCase().includes(this.state.search.toLowerCase())

    }) : []
    // console.log("dataFilter", dataFilter);
    const tableData = dataFilter ? dataFilter.map((x, i) => (

      <tr id="dataid10" role="row" className="odd" key={i}>
        <td className="sorting_1">{i + 1}</td>
        <td>{x.banner_name}</td>
        <td>{x.banner_heading}</td>
        <td>{x.description}</td>
        <td>
          <img src={x.banner_image} className="img-fluid" style={{ maxheight: "50px" }} alt="" />
        </td>

        {/* <td>Restaurant-Cake</td>
        <td>15-05 2021 04:24PM</td> */}
        <td>
          <span>
            <button className="badge badge-success px-2" onClick={(e) => this.change_slider_id(x.id, x.status === "1" ? '0' : '1')} style={{ color: "#fff" }}>{x.status === "1" ? "Active" : "Inactive"}</button>
          </span>
        </td>
        <td>{x.created_at}</td>
        <td>
          <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal1111" data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_slider(x.id)}>
            Edit
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick={(e) => this.get_id(x.id)}>
            Delete
          </button>
          {/* <span>
            <Link to="" >
              <span className="badge badge-warning">Edit</span>
            </Link>
          </span> */}
        </td>
      </tr>
    ))
      : ""
    const { deleteValid, successs, addslidersuccess, changestatus, changestatusdone } = this.state;

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
            onConfirm={(e) => this.delete_slider(e)}
            onCancel={this.onCancel}
            focusCancelBtn
          >
          </SweetAlert>
        ) : ""}

        {successs ? (
          <SweetAlert
            success
            title="Slider deleted successfully"
            onConfirm={this.onCancel}
          >
          </SweetAlert>)
          : ""}

        {addslidersuccess ? (
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
            onConfirm={(e) => this.change_slider_status(e)}
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
                  {/* <div className="fellom">
                 <button type="button" className="btn btn-primary" data-toggle="modal"  data-backdrop="static" data-keyboard="false" data-target="#myModal1111">
                    Add Slider
                  </button>
                 </div> */}
                  <div className="modal" id="myModal1111">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">Add New Slider</h4>
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



                        <form onSubmit={(e) => this.addslider_api(e)}>
                          <div className="modal-body">
                            {/* <div className="form-group">
                              <label className="slider_lit" for="get_title" className="col-form-label">Slider Title</label>
                              <input type="text" className="form-control" id="get_title" name="title" placeholder="Slider Title" />
                            </div>
                            <div className="form-group">
                              <label className="slider_lit" for="get_description" className="col-form-label">Description</label>
                              <textarea name="description" id="get_description" className="form-control" rows="4" placeholder="Description"></textarea>
                            </div> */}


                            <div className="form-group">
                              <label className="slider_lit col-form-label" for="Name">Name</label>
                              <input type="text" className="form-control" id="name" name="name" value={this.state.name} placeholder="name" onChange={(e) => this.handleChange1(e)} required />
                            </div>

                            <div className="form-group">
                              <label className="slider_lit col-form-label" for="Heading">Heading</label>
                              <input type="text" className="form-control" id="manager_name" name="heading" value={this.state.heading} placeholder="heading" onChange={(e) => this.handleChange1(e)} required />
                            </div>


                            <div className="form-group">
                              <label className="slider_lit col-form-label" for="description"></label>
                              <input type="text" className="form-control" id="manager_name" name="description" maxlength="500" value={this.state.description} placeholder="You can add only 150 words...." onChange={(e) => this.handleChange1(e)} required />
                            </div>


                            <div className="form-group">
                              <label className="slider_lit col-form-label" for="image">image</label>
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

                            </div>




                            <div className="gallerys"></div>
                          </div>
                          <div className="modal-footer">
                            <button className="btn btn-secondary" data-dismiss="modal" onClick={this.colse_mess} onClick={this.dismiss}>Close</button>
                            <button type="submit" className="btn btn-primary" >Update</button>
                          </div>
                        </form>



                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="client no-padding-bottom opi">
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
                              <div className="gellp">
                                <h6>All Slider</h6>
                              </div>
                              <div className="fellom">
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#myModal1111">
                                  Add Slider
                                </button>
                              </div>
                            </div>
                            <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                              <thead>
                                <tr role="row">
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "47px" }}>#</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Slider Title: activate to sort column ascending" style={{ width: "179px" }}>Name</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending" style={{ width: "179px" }}>heading</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending" style={{ width: "179px" }}>Description</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "154px" }}>Image</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "122px" }}>Status</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "225px" }}>Created at</th>
                                  <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "225px" }}>Action</th>
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
