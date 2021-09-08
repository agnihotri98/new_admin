import React, { Component } from 'react'
import { Link , NavLink  } from 'react-router-dom'
// import logo from '../image/logoto.png'

import avatar from '../Image/img/avatar-1.jpg';


export default class sidebar extends Component {

    logout = () => {
        localStorage.clear();
    }

    render() {
        return (
            <div>
                <nav className="side-navbar">
                    <div className="sidebar-header d-flex align-items-center">
                        <div className="avatar"><img src={avatar} alt="..." className="img-fluid rounded-circle" /></div>
                        <div className="title">
                            <h1 className="h4">Admin</h1>
                            <p>9876543210</p>
                        </div>
                    </div>
                    {/* <span className="heading">Main</span> */}

                    <ul className="list-unstyled" id="myDIV">

                        <li className="one"><NavLink activeClassName="selected" to="/home" > <i className="icon-home"></i>Home </NavLink ></li>
                        <li className="one"><NavLink activeClassName="selected" to="/Order-List" ><i className="fa fa-file-image-o" aria-hidden="true"></i>Orders </NavLink ></li>
                        <li className="one"><NavLink activeClassName="selected" to="/History-List" ><i className="fa fa-bar-chart"></i>History </NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Slider-List"><i className="fa fa-image"></i>Sliders</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Sec-Slider-List"><i className="fa fa-image"></i>Second Sliders</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Cham-Team"><i className="fa fa-image"></i>Cham Team</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Category-List" ><i className="fa fa-bars" aria-hidden="true"></i>Categories</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Item-List" ><i className="fa fa-plus" aria-hidden="true"></i>Items</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Promotion-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Promotion Banners</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Testimonial-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Testimonial List</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Blog-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Blog List</NavLink ></li>
                    {/* <li><NavLink activeClassName="selected" to="/Working-Hours"><i className="fa fa-clock-o" aria-hidden="true"></i>Working Hours</NavLink ></li> */}
                        <li><NavLink activeClassName="selected" to="/User-list" > <i className="fa fa-users" aria-hidden="true"></i>Users</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Review-List" ><i className="fa fa-star" aria-hidden="true"></i>Reviews</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Complaint-List" ><i className="fa fa-star" aria-hidden="true"></i>Complaint</NavLink ></li>
                        <li><NavLink activeClassName="selected" to="/Reports"><i className="fa fa-bar-chart" aria-hidden="true"></i>Report</NavLink ></li>
                        {/* <li onClick={this.logout}><NavLink  to="/login"> <i className="icon-interface-windows"></i>Login page </NavLink ></li> */}

                    </ul>

                </nav>
            </div>
        )
    }
}
