import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from "react-router";
// import logo from '../image/logoto.png'
import SweetAlert from 'react-bootstrap-sweetalert';
// import { useHistory } from "react-router-dom";

export default class header extends Component {
    state = {
        deleteValid: false,
        isLoggedIn: false,
    }
    deleteget_id = () => {
        this.setState({
            deleteValid: true,
        })
    //    this.logout()
    }
    onCancel = () => {
        this.setState({
            deleteValid: false,

        })
    }
    logout = () => {
        localStorage.clear();
        this.setState({isLoggedIn: !this.state.isLoggedIn,});
        // <Redirect to="/Login" />
        // history.push("/login");
    }

   


    render() {
    
        const { deleteValid } = this.state;
        return (
            <div>
{
    (this.state.isLoggedIn) &&
      <Redirect to="/Login" />
    }
 

            {deleteValid ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure you want to logout?"
                        onConfirm={(e) => this.logout(e)} 
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}


                {/* <!-- Main Navbar--> */}
                <header className="header">
                    <nav className="navbar">
                        {/* <!-- Search Box--> */}
                        <div className="search-box">
                            <button className="dismiss"><i className="icon-close"></i></button>
                            <form id="searchForm" action="#" role="search">
                                <input type="search" placeholder="What are you looking for..." className="form-control" />
                            </form>
                        </div>
                        <div className="container-fluid">
                            <div className="navbar-holder d-flex align-items-center justify-content-between">
                                {/* <!-- Navbar Header--> */}
                                <div className="navbar-header">
                                    {/* <!-- Navbar Brand --> */}
                                    <Link to="/" className="navbar-brand d-none d-sm-inline-block">
                                        <div className="brand-text d-none d-lg-inline-block"><span className="series">C</span><strong>ham</strong></div>
                                        <div className="brand-text d-none d-sm-inline-block d-lg-none"><strong></strong></div></Link>
                                    {/* <!-- Toggle Button--> */}
                                    <Link id="toggle-btn" href="#" className="menu-btn active"><span></span><span></span><span></span></Link>
                                </div>
                                {/* <!-- Navbar Menu --> */}
                                <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
                                    {/* <!-- Search--> */}

                                    {/* <!-- Notifications--> */}
                                    <li className="nav-item dropdown"> <Link id="notifications" rel="nofollow" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link"><i className="fa fa-bell-o"></i><span className="badge bg-red badge-corner">0</span></Link>
                                        <ul aria-labelledby="notifications" className="dropdown-menu">
                                            {/* <!-- <li><a rel="nofollow" href="#" className="dropdown-item"> 
                        <div className="notification">
                          <div className="notification-content"><i className="fa fa-envelope bg-green"></i>You have 3 new messages </div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li> --> */}
                                            {/* <!--  <li><a rel="nofollow" href="#" className="dropdown-item"> 
                        <div className="notification">
                          <div className="notification-content"><i className="fa fa-twitter bg-blue"></i>You have 2 followers</div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li> --> */}
                                            {/* <!--  <li><a rel="nofollow" href="#" className="dropdown-item"> 
                        <div className="notification">
                          <div className="notification-content"><i className="fa fa-upload bg-orange"></i>Server Rebooted</div>
                          <div className="notification-time"><small>4 minutes ago</small></div>
                        </div></a></li> -->
                   <!--  <li><a rel="nofollow" href="#" className="dropdown-item"> 
                        <div className="notification">
                          <div className="notification-content"><i className="fa fa-twitter bg-blue"></i>You have 2 followers</div>
                          <div className="notification-time"><small>5 minutes ago</small></div>
                        </div></a></li> --> */}
                                            {/* <!--  <li><a rel="nofollow" href="#" className="dropdown-item all-notifications text-center"> <strong>view all notifications                                            </strong></a></li> --> */}
                                        </ul>
                                    </li>
                                    {/* <!-- Messages                        -->
           onClick={this.logout}
                <!-- Logout    --> */}
                                   
                                    <li className="nav-item"  onClick={(e) => this.deleteget_id()} >
                                 {/* <Link to="/login"  className="nav-link logout">   */}
                                    
                                        <span className="d-none d-sm-inline">
                                            Logout</span><i className="fa fa-sign-out"></i>
                                            {/* </Link>  */}
                                            </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>


            </div>
        )

 
    }
}
