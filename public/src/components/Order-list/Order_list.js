import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Orders_tab from "./Tabs/Order_listTab";
import Pagination from '../pagination/pagination';

import ReactPaginate from 'react-paginate';
import Progress from 'react-progress-2';
import 'react-progress-2/main.css';

import { BaseURL } from '../base_url';

export default class Order_list extends Component {

    state = {
        usercount: '0',
        checkstatus: false,
        changestatus: false,
        loading: false,
        userlist: [],
        message: "",
        currentPage: 1,
        postsPerPage: 10,
        Retailer: true,
        pageCount: "",
    }

    componentDidMount = () => {
        this.getorder_api();
    }

    getorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-order?page=${this.state.currentPage}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log(result?.data?.data);
                if (result.data) {
                    this.setState({
                        userlist: result?.data?.data,
                        loading: true,
                        pageCount: result?.data.last_page,
                        from: result?.data.from,
                        last_page: result?.data.last_page,
                        per_page: result?.data.per_page,
                        to: result?.data.to,
                        total: result?.data.total,
                        message: result?.message
                    })
                }
                if (result?.message === "Something Went Wrong") {
                    this.setState({
                        message: result.message
                    })
                }
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log(err.response);

            });
    }


    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    handleChange = (e) => {
        this.setState({
            postsPerPage: e.target.value,
            currentPage: 1,
        })
    }
    handleChange11 = (e) => {
        this.setState({ selectValue: e.target.value });
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

    handlePageClick = async (data) => {
        const page = data.selected >= 0 ? data.selected + 1 : 0;
        await Promise.resolve(this.setState(() => ({ currentPage: page })));
        this.getorder_api();
    }

    render() {

        const { checkstatus, changestatus, Retailer, WholeSaler, userlist } = this.state;

        return (
            <div>

                {checkstatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        cancelBtnText="cancel"
                        confirmBtnText="Yes, update it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        title="Are you sure you want to update the status?"
                        onConfirm={(e) => this.changeStatus_api(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {changestatus ? (
                    <SweetAlert
                        success
                        title="Updated successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}

                <div className="page">
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        <Sidebars />
                        <div className="content-inner">
                            <header className="page-header">
                                <div className="container-fluid">
                                    <h2 className="no-margin-bottom">Welcome To Cham</h2>
                                </div>
                            </header>

                            <section class="dashboard-counts no-padding-bottom">
                                <div class="container-fluid">
                                    <div class="row bg-white has-shadow">
                                        <div class="col-xl-3 col-sm-6">
                                            <div class="card gradient-3 2">
                                                <Link to="/Order-List" >
                                                    <div class="card-body_one">
                                                        <h3 class="card-title_one">Orders</h3>
                                                        <div class="d-inline-block">
                                                            <h2 class="text-one_one">{userlist?.length > 0 ? userlist.userlist.length : ""}</h2>
                                                        </div>
                                                        <span class="float-right display-5 opacity-5" style={{ color: "#fff" }}><i class="fa fa-shopping-cart"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-sm-6">
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section class="slip_text">
                                <div class="container-fluid">
                                    <div class="row bg-white has-shadow one">
                                        <div class="col-sm-5">
                                            <div class="anny_text">
                                                <div class="input-group">
                                                    <div class="form-outline one">
                                                        <input type="search" id="form1" class="form-control" placeholder="Search Id Number & Name" onChange={(e) => this.searchSpace(e)} />
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
                                                        <Tab onClick={this.Order_pagination}> Retailer</Tab>
                                                        <Tab onClick={this.Order_pagination1}> WholeSaler</Tab>
                                                    </TabList>

                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tabs-1" role="tabpanel">

                                                            <div className="col-lg-12">
                                                                <div className="series_lo">
                                                                    <div className="series_one">
                                                                        <div className="series_five">
                                                                            <div className="series_three">
                                                                                <h6>All Orders</h6>
                                                                            </div>

                                                                            <TabPanel>

                                                                                <Orders_tab props_data={userlist.data} getorder_api={this.getorder_api} />
                                                                            </TabPanel>

                                                                            <TabPanel>

                                                                                <Orders_tab props_data={userlist.data} getorder_api={this.getorder_api} />
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
