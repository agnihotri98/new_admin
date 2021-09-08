import React, { Component } from 'react'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files';
import Pagination from '../pagination/pagination';
export default class SecSlider_List extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        deleteValid: false,
        description: '',
        heading: '',
        successs: false,
        addsecslidersuccess: false,
        deletesuccess: '',

    }

    componentDidMount = () => {
        this.getsecond_Slider_api();
    }
   onFilesChange = (files) => {
        if(files.length !== 0){
            if (files[0]) {
                console.log(files)
                this.setState({
                    image: files[0],
                    image_url: URL.createObjectURL(files[0]),
                })
            }
        }

    }
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }
    getsecond_Slider_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/getsecond_Slider", {
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
    addsecond_Slider_api = (e) => {
        // debugger
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("description", this.state.description);
        data.append("heading", this.state.heading);

        data.append("image", this.state.image);
        axios
            .post(`http://134.209.157.211/champbakery/public/api/${this.state.sec_slider_id ? `editsecond_Slider/${this.state.sec_slider_id}` : `addsecond_Slider`}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {


                if (res.data.message === "Second Slider Added Successfully") {
                    this.setState({
                        success: res.data.message,
                        addsecslidersuccess: true
                    })
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getsecond_Slider_api();

                }
                if (res.data.message === "Second Slider Updated Successfully") {
        
                    this.setState({
                        success: res.data.message,
                        addsecslidersuccess: true
                    })
                    this.getsecond_Slider_api();
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
    delete_second_Slider = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/delete_second_Slider/${this.state.id_d}`, {
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
                    // this.props.history.push('/Slider-List')
                    // window.location.reload();
                    this.getsecond_Slider_api();

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

    deletesecslider_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }

    edit_secslider = (id) => {
        const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : ""

        this.setState({
          sec_slider_id: id,
          image_url: img[0].image,
          description: img[0].description,
          heading: img[0].heading
        })
      }

    dismiss = () => {
        this.setState({
         description: '',
         sec_slider_id:'',
         image_url: '',
         heading: '',
        })
     }
    onCancel = () => {
        if (this.state.addsecslidersuccess === true || this.state.successs === true) {
            window.location.reload();
        }
        this.setState({
            deleteValid: false,
            successs: false,
            addsecslidersuccess: false,
        })
    }

    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.heading.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        console.log("dataFilter", dataFilter);
        const tableData = dataFilter ? dataFilter.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td>{x.heading}</td>
                <td>{x.description}</td>
                <td><img src={x.image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.image} /></td>
                <td>{x.created_at}</td>
                <td>
                <button type="button" className="btn btn-warning  he" data-toggle="modal" data-target="#myModal"  data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_secslider(x.id)}>
                    Edit
                </button>
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deletesecslider_id(x.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        ))
        : ""

        const { deleteValid, successs, addsecslidersuccess } = this.state;

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
                        onConfirm={(e) => this.delete_second_Slider(e)}
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

                {addsecslidersuccess ? (
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
                                        {/* <button type="button" className="btn btn-primary" data-toggle="modal"  data-backdrop="static" data-keyboard="false" data-target="#myModal">
                                            Add Second Slider
                                        </button> */}
                                        <div className="modal" id="myModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Add New Second Slider</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"  onClick={this.dismiss}>×</span>
                                                        </button>
                                                    </div>
                                                    <form id="add_banner" onSubmit={(e) => this.addsecond_Slider_api(e)}>
                                                        <div className="modal-body">


                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="heading">Headings:</label>
                                                                <input type="text" className="form-control" id="heading" name="heading" value={this.state.heading} placeholder="heading" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="content">Description:</label>
                                                                <textarea className="form-control" id="description" maxlength="500" value={this.state.description} name="description" placeholder="You can add only 150 words ..." onChange={(e) => this.handleChange1(e)} required ></textarea>
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
                                                                    maxFileSize={50000000}
                                                                    minFileSize={0}
                                                                    clickable
                                                                >
                                                                    {this.state.image_url ? <img src={this.state.image_url} alt={this.state.image_url} style={{ height: "50px" }} /> : "click to upload"}
                                                                </Files>
                                                            </div>


                                                            <div className="modal-footer">
                                                                <button className="btn btn-secondary" data-dismiss="modal"  onClick={this.dismiss}>Close</button>
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
                            <section className="client no-padding-bottom io">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="divlone">
                                                        <div className="series_three">
                                                            <h6>All Second Slider</h6>
                                                        </div>
                                                        <div className="divlone">
                                                        <button type="button" className="btn btn-primary" data-toggle="modal"  data-backdrop="static" data-keyboard="false" data-target="#myModal">
                                            Add Second Slider
                                        </button>

                                                        </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending" style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "338px" }}>Headings</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Description</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Image</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "174px" }}>Action</th>
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
