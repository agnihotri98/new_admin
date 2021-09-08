import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Pagination from '../pagination/pagination';
import User_tab from "./Tabs/UserlistTab";


export default class user_list extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        changestatus: false,
        changestatusdone: false,
        Retailer: true,
    }

    componentDidMount = () => {
        this.getusers_api();
    }

    getusers_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/user-list", {
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


    Order_pagination = () => {
        this.setState({
            currentPage: 1,
            Retailer: true,
            WholeSaler: false,
            postsPerPage: 10,
        })
    }

    Order_pagination1 = () => {
        this.setState({
            currentPage: 1,
            WholeSaler: true,
            Retailer: false,
            postsPerPage: 10,
        })
    }


    render() {

        const pending_f = this.state.userlist ? this.state.userlist.filter((x) => x.role === "Retailer") : "";
        const cancel_f = this.state.userlist ? this.state.userlist.filter((x) => x.role === "WholeSaler") : "";

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;



        const pending_filter = pending_f ? pending_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.email.toLowerCase().includes(this.state.search.toLowerCase())) {
                return x;
            }

        }) : []


        const cancel_filter = cancel_f ? cancel_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.email.toLowerCase().includes(this.state.search.toLowerCase())
        }) : []

        const currentPosts = pending_filter ? pending_filter.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = pending_filter ? pending_filter.length : "";

        const currentPosts1 = cancel_f ? cancel_f.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length1 = cancel_f ? cancel_f.length : "";



        const { changestatus, changestatusdone } = this.state;
        return (
            <div>

                {changestatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, Change it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure you want to change it?"
                        onConfirm={(e) => this.useractivation(e)}
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
                            {/* <!-- Page Header--> */}
                            <header className="page-header">
                                <div className="container-fluid">
                                    <h2 className="no-margin-bottom">Welcome, Anny</h2>
                                </div>
                            </header>
                            <section className="dashboard-counts no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow">
                                        <div className="col-lg-3 col-sm-6">
                                            <div className="card gradient-4">
                                                <Link to="/User-list" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">All Users</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.usercount}</h2>
                                                        </div>
                                                        <span className="float-right display-5"><i className="fa fa-users" aria-hidden="true"></i></span>
                                                    </div>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="slip_text">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow one">
                                        <div className="col-sm-5">
                                            <div className="anny_text">
                                                <div className="input-group">
                                                    <div className="form-outline one">
                                                        <input type="search" id="form1" className="form-control" placeholder="Search Users Name" onChange={(e) => this.searchSpace(e)} />
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-sm-7">
                                            <div className="anny_text_one">

                                                {/* <div className="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" onChange={(e) => this.searchSpace(e)} />
                                                       
                                                    </form>
                                                </div> */}


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">


                                        <div className="col-sm-12">
                                            <Tabs>
                                                <div className="tab_plas">
                                                    <TabList>
                                                        <Tab onClick={this.Order_pagination}  >Retailer</Tab>
                                                        <Tab onClick={this.Order_pagination1} >WholeSaler</Tab>
                                                    </TabList>

                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tabs-1" role="tabpanel">

                                                            <div className="col-lg-12">
                                                                <div className="series_lo">
                                                                    <div className="series_one">
                                                                        <div className="series_five">
                                                                            <div className="series_three">
                                                                                <h6>All Orders  History</h6>
                                                                            </div>


                                                                            <TabPanel>

                                                                                <User_tab props_data={currentPosts} getusers_api={this.getusers_api} role="User" />
                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                                <User_tab props_data={currentPosts1} getusers_api={this.getusers_api} role="Wholesaler" />
                                                                            </TabPanel>
                                                                            <div classNameName="row" style={{ width: "100%" }}>

                                                                                <div classNameName="col-md-6" >
                                                                                    <h3 classNameName="total_rec"> Show once  </h3>
                                                                                    <select id="dropdown_custom" onChange={this.handleChange} value={this.state.postsPerPage}>
                                                                                        <option value="10">10</option>
                                                                                        <option value="20">20</option>
                                                                                        <option value="40">40</option>
                                                                                        <option value="80">80</option>
                                                                                        <option value="100">100</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div classNameName="col-md-6" >
                                                                                    <div className="gelcoll">
                                                                                        <Pagination postsPerPage={this.state.postsPerPage}
                                                                                            totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} /></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </Tabs>
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
