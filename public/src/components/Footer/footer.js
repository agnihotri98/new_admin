import React, { Component } from 'react'

export default class footer extends Component {
    render() {
        return (
            <div>
                <footer className="main-footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                <p>Copyright Mechcubei &copy;2021</p>
                            </div>
                            {/* <!-- <div className="col-sm-6 text-right">
                  <p>Design by <a href="https://bootstrapious.com/p/admin-template" className="external">Bootstrapious</a></p>
                   Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions. Thank you for understanding :)
                </div> --> */}
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
