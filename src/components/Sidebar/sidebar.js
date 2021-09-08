import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import logo from '../image/logoto.png'

import avatar from '../Image/img/avatar-1.jpg';
export default class sidebar extends Component {
    logout = () => {
        localStorage.clear();
        // window.l
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
                        <li className="one"><Link to="/" > <i className="icon-home"></i>Home </Link></li>
                        <li className="one"><Link to="/Order-List" ><i className="fa fa-file-image-o" aria-hidden="true"></i>Orders </Link></li>
                        <li className="one"><Link to="/History-List" ><i className="fa fa-bar-chart"></i>History </Link></li>
                        <li><Link to="/Slider-List"><i className="fa fa-image"></i>Sliders</Link></li>
                        <li><Link to="/Sec-Slider-List"><i className="fa fa-image"></i>Second Sliders</Link></li>
                        <li><Link to="/Cham-Team"><i className="fa fa-image"></i>Cham Team</Link></li>
                        <li><Link to="/Category-List" ><i className="fa fa-bars" aria-hidden="true"></i>Categories</Link></li>
                        <li><Link to="/Item-List" ><i className="fa fa-plus" aria-hidden="true"></i>Items</Link></li>
                        <li><Link to="/Promotion-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Promotion Banners</Link></li>
                        <li><Link to="/Testimonial-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Testimonial List</Link></li>
                        <li><Link to="/Blog-List"><i className="fa fa-bullhorn" aria-hidden="true"></i>Blog List</Link></li>

                        <li><Link to="/Working-Hours"><i className="fa fa-clock-o" aria-hidden="true"></i>Working Hours</Link></li>
                        <li><Link to="/User-list" > <i className="fa fa-users" aria-hidden="true"></i>Users</Link></li>
                        <li><Link to="/Review-List" ><i className="fa fa-star" aria-hidden="true"></i>Reviews</Link></li>
                        <li><Link to="/Complaint-List" ><i className="fa fa-star" aria-hidden="true"></i>Complaint</Link></li>

                        <li><Link to="/Reports"><i className="fa fa-bar-chart" aria-hidden="true"></i>Report</Link></li>
                        {/* <li onClick={this.logout}><Link to="/login"> <i className="icon-interface-windows"></i>Login page </Link></li> */}
                    </ul>

                </nav>
            </div>
        )
    }
}
