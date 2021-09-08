import React, { Component } from 'react'
export default class ForgotPassword extends Component {


    render() {

        return (
            <div>
                <div class="page login-page" >
                    <div class="container d-flex align-items-center">
                        <div class="form-holder has-shadow">
                            <div class="row">

                                <div class="col-lg-6">
                                    <div class="info d-flex align-items-center">
                                        <div class="content">
                                            <div class="logo">
                                                <img src="/static/media/logoto.aa31f16b.png" />
                                            </div>
                                            <p class="lop">Wel Come To Email Id</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6 bg-white">
                                    <div class="form d-flex align-items-center">
                                        <div class="content">
                                            <form method="post" class="form-validate">
                                                <div class="form-group">
                                                    <input id="login-username" type="text" name="loginUsername" required data-msg="Please enter your username" class="input-material" placeholder="Enter Email" />
                                                   
                                                </div>
                                                
                                                <a id="login" href="https://www.google.com/gmail/about/" class="btn btn-primary">Submit</a>

                                            </form>
                                            
                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p>Design by <a href="https://bootstrapious.com/p/admin-template" class="external">Bootstrapious</a>
                            Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)
                        </p>
                    </div>
                </div>



        )
    }
}
