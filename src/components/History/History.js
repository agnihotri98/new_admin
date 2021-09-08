import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Orders_tab from "./Tabs/Orderhistory";

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
// import Pagination from '../pagination/pagination';
import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';
import { BaseURL } from '../base_url';

export default class History extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        pageCount: "",
        Delivered: true,
    }

    componentDidMount = () => {
        this.getallorder_api();
    }

    getallorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-order?page=${this.state.currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                debugger
                console.log("result.data.data", result.data.data.data);
                this.setState({
                    userlist: result.data.data.data,
                    pageCount: result?.data.last_page,
                    from: result?.data.from,
                    last_page: result?.data.last_page,
                    per_page: result?.data.per_page,
                    to: result?.data.to,
                    total: result?.data.total,
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

    handlePageClick = async (data) => {
        const page = data.selected >= 0 ? data.selected + 1 : 0;
        await Promise.resolve(this.setState(() => ({ currentPage: page })));
        this.getallorder_api();
    }

    render() {

        // const pending_f = this.state.userlist ? this.state.userlist?.filter((x) => x.status === "complete") : "";
        // const cancel_f = this.state.userlist ? this.state.userlist?.filter((x) => x.status === "cancel") : "";

        // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

        // const currentPosts = pending_f ? pending_f.filter((data, i) => {
        //     if (!this.state.search) return data;
        //     else if (
        //         data.order_number.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.address.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.first_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.last_name.toLowerCase().includes(this.state.search.toLowerCase())
        //     ) {
        //         return data
        //     }

        // }) : []

        // const currentPosts1 = cancel_f ? cancel_f.filter((data, i) => {
        //     if (!this.state.search) return data;
        //     else if (
        //         data.order_number.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.address.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.first_name.toLowerCase().includes(this.state.search.toLowerCase()) ||
        //         data.last_name.toLowerCase().includes(this.state.search.toLowerCase())
        //     ) {
        //         return data
        //     }

        // }) : []

        // const pending_filter = currentPosts ? currentPosts.slice(indexOfFirstPost, indexOfLastPost) : "";
        // const length = currentPosts ? currentPosts.length : "";

        // const cancel_filter = currentPosts1 ? currentPosts1.slice(indexOfFirstPost, indexOfLastPost) : "";
        // const length1 = currentPosts1 ? currentPosts1.length : "";

        const { Delivered , userlist } = this.state;

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
                                                                                <Orders_tab props_data={userlist} getallorder_api={this.getallorder_api} />
                                                                            </TabPanel>
                                                                            <TabPanel>
                                                                                <Orders_tab props_data={userlist} getallorder_api={this.getallorder_api} />
                                                                            </TabPanel>
                                                                          
                                                                            <div classNameName="row" style={{ width: "100%" }}>


                                                                                <Progress.Component
                                                                                    style={{ background: 'orange' }}
                                                                                    thumbStyle={{ background: 'green' }}
                                                                                />

                                                                                <ReactPaginate
                                                                                    pageCount={this.state.pageCount}
                                                                                    initialPage={this.state.currentPage - 1}
                                                                                    forcePage={this.state.currentPage - 1}
                                                                                    pageRangeDisplayed={2}
                                                                                    marginPagesDisplayed={2}
                                                                                    previousLabel="&#x276E;"
                                                                                    nextLabel="&#x276F;"
                                                                                    containerClassName="uk-pagination uk-flex-center"
                                                                                    activeClassName="uk-active"
                                                                                    disabledClassName="uk-disabled"
                                                                                    onPageChange={this.handlePageClick}
                                                                                    disableInitialCallback={true}
                                                                                />

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
