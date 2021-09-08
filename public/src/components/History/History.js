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


import {BaseURL} from '../base_url';


export default class History extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        Delivered: true,
    }

    componentDidMount = () => {
        this.getallorder_api();
    }

    getallorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    userlist: result.data.data
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


    Order_pagination = () => {
        this.setState({
            currentPage: 1,
            Delivered: true,
            Cancel: false,
            postsPerPage: 10,
        })
    }

    Order_pagination1 = () => {
        this.setState({
            currentPage: 1,
            Cancel: true,
            Delivered: false,
            postsPerPage: 10,
        })
    }

    render() {

        const pending_f = this.state.userlist ? this.state.userlist.data?.filter((x) => x.status === "complete") : "";
        const cancel_f = this.state.userlist ? this.state.userlist.data?.filter((x) => x.status === "cancel") : "";

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

        const currentPosts = pending_f ? pending_f.filter((data, i) => {
            if (!this.state.search) return data;
            else if (
                data.order_number.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.address.toLowerCase().includes(this.state.search.toLowerCase()) || 
                data.first_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.last_name.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }

        }) : []

        const currentPosts1 = cancel_f ? cancel_f.filter((data, i) => {
            if (!this.state.search) return data;
            else if (
                data.order_number.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.address.toLowerCase().includes(this.state.search.toLowerCase()) || 
                data.first_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
                data.last_name.toLowerCase().includes(this.state.search.toLowerCase())
            ) {
                return data
            }

        }) : []

        const pending_filter = currentPosts ? currentPosts.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = currentPosts ? currentPosts.length : "";

        const cancel_filter = currentPosts1 ? currentPosts1.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length1 = currentPosts1 ? currentPosts1.length : "";

        const { Delivered } = this.state;

        return (
            <div>

                <div className="page">
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        <Sidebars />
                        <div className="content-inner">

                            <section className="slip_text">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow one">
                                        <div className="col-sm-5">
                                            <div className="anny_text">
                                                <div className="input-group">
                                                    <div className="form-outline one">
                                                        <input type="search" id="form1" className="form-control" placeholder="Search Id Number and Name" onChange={(e) => this.searchSpace(e)} />
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
                                        <div className="col-sm-12">
                                            <Tabs>
                                                <div className="tab_plas">
                                                    <TabList>
                                                        <Tab onClick={this.Order_pagination}>  Delivered</Tab>
                                                        <Tab onClick={this.Order_pagination1}> Cancel</Tab>
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
                                                                                <Orders_tab props_data={pending_filter} getallorder_api={this.getallorder_api} />
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                                <Orders_tab props_data={cancel_filter} getallorder_api={this.getallorder_api} />
                                                                            </TabPanel>
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
                                                                                    {Delivered ?
                                                                                        // <div> 

                                                                                        pending_f?.length > 10 ?
                                                                                        <div className="gelcoll">

                                                                                            <Pagination postsPerPage={this.state.postsPerPage}
                                                                                                totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} />
                                                                                        </div>
                                                                                        : ""

                                                                                        // </div>

                                                                                        :
                                                                                        cancel_f?.length > 10 ?
                                                                                        <div className="gelcoll">
                                                                                            <Pagination postsPerPage={this.state.postsPerPage}
                                                                                                totalPosts={length1} paginate={this.paginate} currentPage={this.state.currentPage} />
                                                                                        </div>
                                                                                         :""
                                                                                    }
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
