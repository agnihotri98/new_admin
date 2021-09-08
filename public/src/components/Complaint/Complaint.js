import React, { Component } from 'react'
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
// import Files from 'react-files';
import axios from "axios";
import { Link } from 'react-router-dom'
import Pagination from '../pagination/pagination';
import { BaseURL } from '../base_url';

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
            .get(`${BaseURL}/api/listComplaint`, {
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

    setSize = (content) => {
        const cont = content.slice(0, 50);
        return <> {content.length > 50 ? cont + "..." : cont}  </>;

    }

    setSize1 = (content) => {
        const cont = content.slice(0, 50);
        return <>{content.length > 50 ? cont + "..." : cont} </>;

    }


    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";

        const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
            debugger
            if (!this.state.search) return x;
            else if (
                x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                x.order_number.toLowerCase().includes(this.state.search.toLowerCase())
            )
                return x;

        }) : []
        console.log("currentPosts", currentPosts);
        const tableData = dataFilter ? dataFilter.map((x, i) => (
            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td>{x.first_name} {x.last_name}</td>
                <td>{x.email}</td>
                <td>{x.order_number}</td>
                <td>{this.setSize(x.complaint_reason)}</td>
                <td>{this.setSize1(x.description)}</td>
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

                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>All Complaints</h6>
                                                        </div>
                                                        <div>
                                                            <div class="form-outline one">
                                                                <input type="search" id="form1" class="form-control" placeholder="Search Id Number & Name" onChange={(e) => this.searchSpace(e)} />
                                                            </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting_asc" style={{ width: "58px" }}>#</th>
                                                                    <th className="sorting" style={{ width: "250px" }}>Username</th>
                                                                    <th className="sorting" style={{ width: "250px" }}>UserEmail</th>
                                                                    <th className="sorting" style={{ width: "150px" }}>Order Number</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Complaint Reason</th>
                                                                    <th className="sorting" style={{ width: "338px" }}>Complaint Description</th>
                                                                    <th className="sorting" style={{ width: "258px" }}>Created at</th>
                                                                    <th className="sorting" style={{ width: "143px" }}>Action</th>
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
