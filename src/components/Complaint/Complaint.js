import React, { Component } from 'react'
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
// import Files from 'react-files';
import axios from "axios";
import { Link } from 'react-router-dom'
import Pagination from '../pagination/pagination';
export default class Complaint extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
    }

    componentDidMount = () => {
        this.getComplaint_api();
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

    getComplaint_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/listComplaint", {
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
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.category_name.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        console.log("dataFilter", dataFilter);
        const tableData = dataFilter ? dataFilter.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                    <td>{x.first_name} {x.last_name}</td>
                    <td>{x.email}</td>
                <td>{x.order_number}</td>
                <td>{x.complaint_reason}</td>
                <td>{x.description}</td>
                {/* <td><img src={x.complaint_image} className="img-fluid" style={{ maxHeight: "50px" }} alt={x.complaint_image} /></td> */}
                <td>{x.created_at}</td>
                <td>
                    <Link to={`/Complaint-view/${x.id}`} >
                        <span className="badge badge-warning">View</span>
                    </Link>
                </td>
            </tr>
        ))
            : []



        return (
            <div>
                <div className="page">
                    {/* <!-- Main Navbar--> */}

                    <Headers />

                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div className="content-inner">
                            {/* <section className="dashboard-counts no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="model">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                            Add Promotion Banner
                                        </button>
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
                                                                    className='form-control'
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
                                                                <input type="text" className="form-control" id="description" name="description" placeholder="Description" onChange={(e) => this.handleChange1(e)} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="slider_lit col-form-label" for="expiry_date">Expiry Date:</label>
                                                                <input type="date" className="form-control" id="expiry_date" name="expiry_date" placeholder="Expiry Date" onChange={(e) => this.handleChange1(e)} required />
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
                            </section> */}
                            <section className="client no-padding-bottom_btlp">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>All Complaints</h6>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row"><th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="#: activate to sort column descending" style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Image: activate to sort column ascending" style={{ width: "338px" }}>Username</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>UserEmail</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Order Number</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Complaint Reason</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "50px" }}>Complaint Description</th>

                                                                    {/* <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style={{ width: "338px" }}>Complaint Image</th> */}
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "143px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        <div className="holop" style={{ width: "100%" }}>

                                                            <div className="glope" >
                                                                <h3 className="total_rec"> Show once  </h3>
                                                                <select id="dropdown_custom" onChange={this.handleChange} >
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="80">80</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </div>
                                                            <div className="fedlop" >
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
