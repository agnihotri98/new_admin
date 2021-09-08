import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
// import Pagination from '../pagination/pagination';
export default class WorkingHours extends Component {
    state = {

    }

    componentDidMount = () => {
        this.getworkinghours_api();
    }

    getworkinghours_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/get_working_hours", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    workinghourslist: result.data.data
                })
                // console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }

    addworkinghours_api = (e) => {
        e.preventDefault();
        console.log(this.state.data);
    }

    // handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState({ [name]: value });
    // };
    handleChange = (e) => {
        this.setState({
            data: e.target.value
        })
        console.log(e.target.value);
    }
    render() {
        console.log(this.state.workinghourslist);

        const tableData = this.state.workinghourslist ? this.state.workinghourslist.map((x, i) => (

            <div className="form-row">
                <label className="col-sm-2 col-form-label">{x.days}</label>
                <input type="hidden" name="day" value={x.days} onChange={(e) => this.handleChange(e)} />
                <div className="form-group col-md-3">
                    <input type="text" className="form-control ui-timepicker-input" placeholder="Opening Hours" id="openMonday" name="open_time" onChange={(e) => this.handleChange(e)} value={x.opening_hours ? x.opening_hours : ""} autocomplete="off" />
                </div>
                <div className="form-group col-md-3">
                    <input type="text" className="form-control ui-timepicker-input" placeholder="Closing Time" id="closeMonday" name="close_time" value={x.closing_hours} autocomplete="off" />
                </div>
                <div className="form-group col-md-3">
                    <select className="form-control" name="always_close" id="always_closeMonday" value={x.options}>
                        <option>Select the option if it is always closed</option>
                        <option >Yes</option>
                        <option >No</option>
                    </select>
                </div>
            </div>


        ))
            : ""


        return (
            <div>
                <div className="page">
                    {/* <!-- Main Navbar--> */}

                    <Headers />

                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div className="content-inner">
                            <header className="page-header">
                                <div className="row page-titles mx-0">
                                    <div className="col p-md-0">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/" >Dashboard</Link></li>
                                            <li className="breadcrumb-item active"><Link to="/Working-Hours" >Working Hours</Link></li>
                                        </ol>
                                        <h4>Working Hours</h4>
                                    </div>
                                </div>
                            </header>
                            <section className="client no-padding-bottom">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <h6>Working Hours
                                                            </h6>
                                                        </div>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="basic-form">
                                                                    <form onSubmit={(e) => this.addworkinghours_api(e)}>
                                                                        <input type="hidden" name="_token" value="BBVrAwWxejnQvRkXzj1O346Fomx0eLgdlvGTCoc6" />
                                                                        <div className="form-row">
                                                                            <label className="col-sm-2 col-form-label"></label>
                                                                            <div className="form-group col-md-3 one" style={{ textAlign: "center" }}>
                                                                                <label><strong>Opening Hours</strong></label>
                                                                            </div>
                                                                            <div className="form-group col-md-3 one" style={{ textAlign: "center" }}>
                                                                                <label><strong>Closing Time</strong></label>
                                                                            </div>
                                                                            <div className="form-group col-md-3 one" style={{ textAlign: "center" }}>
                                                                                <label><strong>Select the option if it is always closed</strong></label>
                                                                            </div>
                                                                        </div>
                                                                        {tableData}
                                                                        <button type="button" className="btn btn-primary" onclick="myFunction()">Save</button>
                                                                    </form>
                                                                </div>
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

