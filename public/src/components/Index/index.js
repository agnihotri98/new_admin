import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';

import op from '../Image/image/op.jpg';
import op1 from '../Image/image/op1.jpg';
import op2 from '../Image/image/op2.jpg';
import {BaseURL} from '../base_url';


export default class index extends Component {
    state = {
        get_list: '',
        curTime: new Date().toLocaleString(),
        loading: false,
        loading0: false,
        loading00: false,
        checkstatus: false,
        changestatus: false,
    }

    componentDidMount = () => {
        this.getusers_api();
        this.getorder_api();
        this.gettrendingorder_api();
        this.getrecentlyorder_api();
    }

    getusers_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    get_list: result.data.data
                })

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    getorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-today-order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    orderlist: result.data.data,
                    loading: true,
                })
                console.log("result", this.state.orderlist);

            })
            .catch((err) => {
                this.setState({
                    loading: false,
                })
                console.log(err.response);

            });
    }


    getrecentlyorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/recent_placed_order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    recentorderlist: result.data.data,
                    loading00: true,
                })
                console.log("result", this.state.recentorderlist);

            })
            .catch((err) => {
                this.setState({
                    loading: false,
                })
                console.log(err.response);

            });
    }

    gettrendingorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-trending-order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    trendingorderlist: result.data.data,
                    loading0: true,
                })
                console.log("result", this.state.trendingorderlist);

            })
            .catch((err) => {
                this.setState({
                    loading0: false,
                })
                console.log(err.response);

            });
    }
    handleChange11 = (e) => {
        this.setState({ selectValue: e.target.value });
    }


    changeStatus_api = () => {
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("request_id", this.state.orderid);
        data.append("status", this.state.orderstatus);

        axios
            .post(`${BaseURL}/api/change_status`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {

                console.log(res);
                if (res.data.message === "update Status") {
                    this.setState({
                        success: res.data.message,
                        changestatus: true
                    })
                    this.getorder_api();
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    change_Status_id = (id, e) => {
        this.setState({
            orderid: id,
            orderstatus: e.target.value,
            checkstatus: true,
        })
    }

    onCancel = () => {
        this.setState({
            checkstatus: false,
            changestatus: false,
        })
    }
    render() {
        const { loading, loading0, loading00 } = this.state;
        const tableData = this.state.orderlist?.length > 0 && loading === true ? this.state.orderlist?.map((x, i) => (

            <tr id="dataid73" role="row" class="odd" key={i}>
                <td class="sorting_1">{i + 1}</td>
                <td>{x.created_at}</td>
                <td>{x.first_name} {x.last_name}</td>
                <td>{x.order_number}</td>
                <td>{x.address}</td>
                <td>
                    <label class="show_Solo">
                        <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
                            class="form-control form-control-sm one"
                            value={x.status}
                            onChange={(e) => this.change_Status_id(x.id, e)}>
                            {/* <option value="accepted">Accepted</option> */}
                            <option value="processing">Processing </option>
                            {/* <option value="onready">On Ready </option>
                            <option value="ongoing">Ongoing</option> */}
                            <option value="complete">Delivered</option>
                            <option value="cancel">Cancel</option>
                        </select>
                    </label>
                </td>
                <td>
                    <span>
                        <Link to={`/Order-Detail/${x.id}`} >
                            <span className="badge badge-warning">View</span>
                        </Link>
                    </span>
                </td>
            </tr>
        )) :
            ['No Record Found']
        const recentorderList = this.state.recentorderlist?.length > 0 && loading00 === true ? this.state.recentorderlist?.map((x, i) => (

            <tr id="dataid73" role="row" class="odd" key={i}>
                <td class="sorting_1">{i + 1}</td>
                <td>{x.order_number}</td>
                <td>{x.first_name} {x.last_name}</td>
                <td>{x.role}</td>
                <td>{x.address}</td>
                <td>
                    <Link className="hover_color_to" to="">{x.status}</Link>
                </td>
                <td>{x.updated_at}</td>
                <td>
                    ${x.total}
                </td>
            </tr>
        )) :
            ['No Record Found']
        const trendingdata = this.state.trendingorderlist?.length > 0 && loading0 === true ? this.state.trendingorderlist?.map((x, i) => (

            <div className="col-sm-3" key={i}>
                <div className="called">
                    <div className="called_one">
                        <div className="card one">
                            <div className="card-body">
                                <div className="sentence">
                                    <div className="sentence_one">
                                        <div className="sentence_two">
                                            <h6>{x.inventory_name}</h6>
                                        </div>
                                        <div className="sentence_three">
                                            <h6 className="cgreen">${x.price}.00</h6>
                                        </div>
                                    </div>
                                    <div className="sentence_one">
                                        <div className="sen_one">
                                            <span><h6 className="rwo">Orders</h6></span><span className="tene">{x.count}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )) :
            ['No Record Found']

        const { checkstatus, changestatus } = this.state;
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
                                                        <h3 className="card-title_one">Users</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totaluser : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5"><i className="fa fa-users" aria-hidden="true"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-3">
                                                <Link to="/Order-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Orders</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totalorder : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-shopping-cart"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-2">
                                                <Link to="/" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Earnings</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">${this.state.get_list ? this.state.get_list.Totalearning:""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-usd"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-4">
                                                <Link to="/Category-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Categories</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totalcategory : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5"><i className="fa fa-list-alt"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-3">
                                                <Link to="/Review-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Reviews</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totalreview : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-star"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-4">
                                                <Link to="/Item-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Items</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totalitem : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-cutlery"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-3">
                                                <Link to="/Slider-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Sliders</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.Totalslider : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-plus"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-2">
                                                <Link to="/Promotion-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Promotion Banners</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.get_list ? this.state.get_list.TotalCoupon : ""}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-bullhorn"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_two">
                                                        <div className="series_three">
                                                            <h6>MONTHLY REVENUE</h6>
                                                        </div>
                                                        <div className="series_three_one">
                                                            <select className="form-control new" id="exampleSelect">
                                                                <option value="1">January</option>
                                                                <option value="2">February</option>
                                                                <option value="3">March </option>
                                                                <option value="4">April</option>
                                                                <option value="5">May</option>
                                                                <option value="1">June</option>
                                                                <option value="2">July</option>
                                                                <option value="3">August</option>
                                                                <option value="4">September</option>
                                                                <option value="5">October</option>
                                                                <option value="4">November</option>
                                                                <option value="5">December</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <hr />
                                                    <div className="central ">
                                                        <div className="central_one">
                                                            <div className="Week"><h6>Week 1</h6></div>
                                                            <div className="progress_one">
                                                                <div className="progress-bar_one" style={{ width: "60%" }}>
                                                                    60%
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="central_one">
                                                            <div className="Week"><h6>Week 2</h6></div>
                                                            <div className="progress_one">
                                                                <div className="progress-bar_two" style={{ width: "70%" }}>
                                                                    70%
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="central_one">
                                                            <div className="Week"><h6>Week 3</h6></div>
                                                            <div className="progress_one">
                                                                <div className="progress-bar_one" style={{ width: "80%" }}>
                                                                    80%
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="central_one">
                                                            <div className="Week"><h6>Week 4</h6></div>
                                                            <div className="progress_one">
                                                                <div className="progress-bar_one" style={{ width: "50%" }}>
                                                                    50%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                                                <ol className="carousel-indicators">
                                                    <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
                                                    <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                                                    <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                                                </ol>
                                                <div className="carousel-inner" role="listbox">
                                                    <div className="carousel-item active">
                                                        <img className="d-block w-100" src={op} alt="First slide" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img className="d-block w-100" src={op1} alt="First slide" />
                                                    </div>
                                                    <div className="carousel-item">
                                                        <img className="d-block w-100" src={op2} alt="First slide" />
                                                    </div>
                                                </div>
                                                <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                                <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>Today's Orders</h6>
                                                        </div>
                                                        <div className="length_one">
                                                            <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                                <thead>
                                                                    <tr role="row">
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "9px" }}>#</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "50px" }}>Created at</th>

                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style={{ width: "58px" }}>User Name</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Number: activate to sort column ascending" style={{ width: "78px" }}>Order Number</th>

                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Status: activate to sort column ascending" style={{ width: "44px" }}>location</th>

                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Change Order Status: activate to sort column ascending" style={{ width: "84px" }}>Change Order Status</th>
                                                                        <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "41px" }}>Action</th></tr>
                                                                </thead>
                                                                <tbody>
                                                                    {tableData}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="projects no-padding-top">
                                <div className="container-fluid">
                                    <div className="project">
                                        <div className="row bg-white has-shadow">
                                            <div className="col-lg-12 d-flex align-items-center justify-content-between">
                                                <div className="project-title d-flex align-items-center">
                                                    <div className="table_text">
                                                        <div className="hig_text">
                                                            <h4>RECENTLY PLACED ORDERS</h4>
                                                        </div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Order Number</th>
                                                                    <th scope="col">Customer Name</th>
                                                                    <th scope="col">User Type</th>
                                                                    <th scope="col">Location</th>
                                                                    <th scope="col">Order Status</th>

                                                                    <th scope="col">Delivered Time</th>
                                                                    <th scope="col">Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {recentorderList}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="feeds no-padding-top">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="articles card">
                                                <div className="card-close">
                                                </div>
                                                <div className="card-header d-flex align-items-center">
                                                    <h2 className="h3">TRENDING ORDERS</h2>
                                                </div>
                                                <div className="row">
                                                    {trendingdata}
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
