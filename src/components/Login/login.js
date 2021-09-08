import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Image/image/logoto.png';









export default class login extends Component {
    state = {
        email: "",
        password: "",
        mess_err: "",
        phone_number_err:"",
    }

    componentDidMount = () => {
        // this.post_api();
    }

    post_api = (event) => {
        event.preventDefault();
        
            this.setState({
                mess_err: "",
                phone_number_err: "",
            })
    
           
       
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");

        var formdata = new FormData();
        formdata.append("email", this.state.email);
        formdata.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://134.209.157.211/champbakery/public/api/super-login", requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.message === "Success") {
                    console.log("teststtst", result.message);
                   
                        localStorage.setItem('token', result.data.token)
                        this.props.history.push('/')
                    
                }
                // if (result.message === "Check Your credentials") {
                //     if (result.data.first_name !== "" && result.data.last_name !== "" && result.data.email !== "" && result.data.role !== "") {
                //         this.props.history.push('/')
                //     }
                // }
                if (result.message === "Check Your credentials") {
                    this.setState({
                        mess_err: result.message
                    })
                }
                if (result.data.email || result.data.password) {
                    this.setState({
                        phone_number_err: result.data.email || result.data.password
                    })
                }
                console.log(result)
            })
            .catch(error => console.log('error', error));


    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    colse_mess = () => {
        this.setState({
            phone_number_err: "",
            mess_err: ""
        })
    }

    render() {
        return (
            <div>
                <div className="page login-page">
                    <div className="container d-flex align-items-center">
                        <div className="form-holder has-shadow">
                            <div className="row">
                                {/* <!-- Logo & Information Panel--> */}
                                <div className="col-lg-6">
                                    <div className="info d-flex align-items-center">
                                        <div className="content">
                                            <div className="logo">
                                                <img src={logo} alt=""/>
                                            </div>
                                            {/* <p className="lop">Wel Come To Login Id</p> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Form Panel    --> */}
                                <div className="col-lg-6 bg-white">

                                    {this.state.phone_number_err || this.state.mess_err ?
                                        <div className="alert alert-danger alert-block">
                                            <button type="button" onClick={this.colse_mess} className="close">×</button>
                                            <strong>
                                                {this.state.phone_number_err ? this.state.phone_number_err : ""}
                                                {this.state.mess_err ? this.state.mess_err : ""}
                                            </strong>
                                        </div>
                                        : " "}


                                    <div className="form d-flex align-items-center">
                                        <div className="content">
                                            <form onSubmit={this.post_api} className="form-validate">
                                                <div className="form-group">
                                                    <input id="login-username" type="text" name="email" data-msg="Please enter your username" onChange={this.handleChange} className="input-material"  />
                                                    <label for="login-username" className="label-material">User Name</label>
                                                </div>
                                                <div className="form-group">
                                                    <input id="login-password" type="password" name="password" data-msg="Please enter your password" onChange={this.handleChange} className="input-material"  />
                                                    <label for="login-password" className="label-material">Password</label>
                                                </div>
                                                <button id="login" className="btn btn-primary" type="submit">Continue</button>
                                                {/* <a id="login" href="index.html" className="btn btn-primary">Login</a> */}
                                                {/* <!-- This should be submit button but I replaced it with <a> for demo purposes--> */}
                                            </form>
                                            <Link to="/forgot-password" className="forgot-pass">Forgot Password?</Link>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- div className="copyrights text-center">
        <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Bootstrapious</a>
           Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)
        </p>
      </div> --> */}
                </div>
            </div>
        )
    }
}
