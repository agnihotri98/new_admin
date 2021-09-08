import React, { Component } from 'react'
import axios from "axios";
// import { Link } from 'react-router-dom'

import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import '../User-View/style.css';

export default class user_view extends Component {
    state = {
        userdetail:'',
    }
    componentDidMount = () => {
        this.getusersdetail_api();
    }
    getusersdetail_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/user-view/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    
                    userdetail: result.data.data
                })
                console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }
    render() {
        console.log('aaaaaaaaaa',this.props.match.params.id);
       
        
        return (
            
            <div>
                <div className="page">
                    {/* <!-- Main Navbar--> */}

                    <Headers />

                    <div className="page-content d-flex align-items-stretch-gtop">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div className="content-inner">
                        

                        <div className="container fluid">
                            <div className="row bg-white has-shadow one">
                                <div className="col-sm-5">
                                    <div className="name_glop">
                                        <h4>User View</h4>
                                    </div>


                                </div>
                                <div className="col-sm-7">
                                    <div className="anny_text_one">
                                        <div className="deteid">
                                        </div>
                                        <div className="deteid">

                                        </div>
                                        {/* <div className="deteid">
                                            <form action="/action_page.php">
                                                <label for="birthday"></label>
                                                <input type="date" id="birthday" name="birthday" />
                                                <input className="sumfive" type="submit" value="Submit" />
                                            </form>
                                        </div> */}


                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-6 col-sm-6">

                                    <div className="card_rop">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img src={this.state.userdetail?this.state.userdetail.image:""} className="rounded-circle" style={{ maxHeight: "100px" }} alt="" />
                                                {/* <img src="https://gravityinfotech.net/project/food-v4/public/images/profile/unknown.png" width="100px" className="rounded-circle" alt="" /> */}
                                                <h5 className="mt-3 mb-1">{this.state.userdetail?this.state.userdetail.first_name:""} {this.state.userdetail?this.state.userdetail.last_name:""}</h5>
                                                <p className="m-0">{this.state.userdetail?this.state.userdetail.email:""}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm-6">
                                    <div className="card_one">
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img src="https://gravityinfotech.net/project/food-v4/public/front/images/shopping-cart.png" width="100px" alt="" />
                                                <h5 className="mt-3 mb-1">{this.state.userdetail?this.state.userdetail.ordercount:"0"}</h5>
                                                <p className="m-0">Order</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                       




                        <Footers />
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
