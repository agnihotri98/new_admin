import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Orders_tab from "./Tabs/Orderhistory";

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Pagination from '../pagination/pagination';
export default class History extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
    }

    componentDidMount = () => {
        this.getallorder_api();
    }

    getallorder_api = () => {


        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/get-order", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    userlist: result.data.data.data
                })
                console.log("result", this.state.userlist);

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

        const pending_f = this.state.userlist ? this.state.userlist.filter((x) => x.status === "complete") : "";
        const cancel_f = this.state.userlist ? this.state.userlist.filter((x) => x.status === "cancel") : "";
        // console.log("pending_f",pending_f);
        const pending_filter = pending_f ? pending_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.order_number.toLowerCase().includes(this.state.search.toLowerCase()) || x.address.toLowerCase().includes(this.state.search.toLowerCase()) || x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.last_name.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        // console.log("pending_filter ", pending_filter);

        const cancel_filter = cancel_f ? cancel_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.order_number.toLowerCase().includes(this.state.search.toLowerCase()) || x.address.toLowerCase().includes(this.state.search.toLowerCase()) || x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.last_name.toLowerCase().includes(this.state.search.toLowerCase())
        }) : []
        // console.log("dataFilter", dataFilter);

        return (
            <div>
                <div className="page">
                    {/* <!-- Main Navbar--> */}
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div className="content-inner">

                            <section className="slip_text_on">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow one">
                                        <div className="col-sm-5">
                                            <div className="anny_text">
                                                <div className="input-group">
                                                    <div className="form-outline one">
                                                        <input type="search" id="form1" className="form-control" placeholder="Search Id Number and Name" onChange={(e) => this.searchSpace(e)} />
                                                    </div>
                                                    {/* <button type="button" className="btn btn-primary five">
                                                        <i className="fa fa-search-plus" aria-hidden="true"></i>
                                                    </button> */}
                                                </div>

                                            </div>

                                        </div>
                                        {/* <div className="col-sm-7">
                                            <div className="anny_text_one">
                                                <div className="date_text">
                                                    <h6>From</h6>
                                                </div>
                                                <div className="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" />
                                                        <input className="sumfive" type="submit" value="Submit" />
                                                    </form>
                                                </div>
                                                <div className="deteid">
                                                    <div className="date_text">
                                                        <h6>TO</h6>
                                                    </div>
                                                </div>
                                                <div className="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" />
                                                        <input className="sumfive" type="submit" value="Submit" />
                                                    </form>
                                                </div>


                                            </div>

                                        </div> */}
                                    </div>
                                </div>
                            </section>
                            <section className="client no-padding-bottom_one">
                                <div className="container-fluid">
                                    <div className="row">


                                        <div className="col-sm-12">
                                            <Tabs>
                                                <div className="tab_plas">
                                                    <TabList>
                                                        <Tab>Delivered</Tab>
                                                        <Tab>Cancel</Tab>
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
                                                                                {/* {tableData} */}
                                                                                <Orders_tab props_data={pending_filter} />
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                {/* {tableData} */}
                                                                                <Orders_tab props_data={cancel_filter} />
                                                                            </TabPanel>
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
