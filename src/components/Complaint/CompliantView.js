import React, { Component } from 'react'
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import axios from "axios";
import Files from 'react-files';
export default class CompliantView extends Component {
    state = {
        userlist: '',
        comments:'',
        count : 1,
    }

    componentDidMount = () => {
        this.getComplaintView_api();
    }

    onFilesChange = (files) => {
        if (files[0]) {
            console.log(files)
            this.setState({
                image: files[0],
                image_url: URL.createObjectURL(files[0]),
            })
        }

    }
    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }
    getComplaintView_api = () => {

        const token = localStorage.getItem("token");
        axios
            .get(`http://134.209.157.211/champbakery/public/api/complaintView/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    usercount: result.data.data.length,
                    userlist: result.data.data
                })
                
                console.log("result", result.data.data);

            })
            .catch((err) => {

                console.log(err.response);

            });
    }

    addComment_api = (e) => {
        // debugger
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("comment", this.state.comments);
        data.append("order_number", this.state.userlist ? this.state.userlist[0].order_number : "");
        data.append("request_id", this.state.userlist ? this.state.userlist[0].request_id : "");

        data.append("image_1", this.state.image);
        data.append("count", this.state.count);
        axios
            .post("http://134.209.157.211/champbakery/public/api/commentComplaint", data, {
                //   .post('http://134.209.157.211/champbakery/public/api/add_item', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                this.setState({
                    comments: '',
                    image: ''
                })
                this.getComplaintView_api();
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange1 = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const tableData = this.state.userlist ? this.state.userlist[0].complaint_image?.map((x, i) => (
            <span key={i}>
                <img src={x.complaint_image} alt={x.complaint_image} style={{height: "100px"}}/>
            </span>
        ))
            : []

        const commentData = this.state.userlist ? this.state.userlist[0].comment_image?.map((x, i) => (
            <>
                {x.role === 'admin' ?
                    <p style={{position: "relative", left: "30px", color: "blue"}}>{x.comment}
                        <br/>
                        <img src={x.comment_image} alt={x.comment_image} style={{height: "50px"}}/>
                    </p>
                :
                <p style={{position: "relative", right: "30px", color: "Red", textAlign: "right"}}>{x.comment}
                    <br/>
                    <img src={x.comment_image} alt={x.comment_image} style={{height: "50px"}}/>
                </p>
                }
                
                
                {/* <img src={x.complaint_image} alt={x.complaint_image} style={{height: "100px"}}/> */}
            </>
        ))
            : []
            console.log('dsffffffffffffff',commentData);
        return (
            <div>
                <div className="page">
                    {/* <!-- Main Navbar--> */}
                    <Headers />
                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}
                        <Sidebars />
                        <div className="content-inner">
                            <div class="container one">
                                <div class="row">
                                    <div class="col-lg-6 col-xl-6">
                                        <div class="card category-card">
                                            <div class="card-body">
                                                <h4>Name</h4>
                                                <p class="text-muted">{this.state.userlist ? this.state.userlist[0].first_name : ""} {this.state.userlist ? this.state.userlist[0].last_name :""}</p>
                                                <h4>Order Number</h4>
                                                <p class="text-muted">{this.state.userlist ? this.state.userlist[0].order_number : ""}</p>
                                                <h4>Total Amount</h4>
                                                <p class="text-muted">${this.state.userlist ? this.state.userlist[0].total : ""}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="col-lg-6 col-xl-6">
                                        <div id="success-msg" class="alert alert-dismissible mt-3" style={{ display: "none" }}>
                                            <button type="button" class="close" data-dismiss="alert">×</button>
                                            <strong>Message!</strong> <span id="msg"></span>
                                        </div>
                                        <div id="card-display">
                                            <div class="row">
                                                <div class="col-md-6 col-lg-6 dataid102" id="table-image">
                                                    <div class="card_topk">
                                                        <img class="img-fluid" src="./image/op.jpg" alt="" style={{ maxheight: "295px", minheight: "255px" }} />
                                                    </div>
                                                </div>
                                            </div>            
                                        </div>
                                    </div> */}
                                </div>
                                <section class="redit">
                                    <div class="container">
                                        <div class=" row">
                                            <div class="col-md-12">
                                                <div class="color_text">
                                                    <h5>Complaint Details</h5>
                                                </div>
                                                <div class="d-flex flex-column comment-section">
                                                    <div class="bg-white p-5">
                                                        <div class="comrm">
                                                            <hr />
                                                                <h5>{this.state.userlist ? this.state.userlist[0].email : ""}</h5>
                                                            <hr />
                                                        </div>
                                                        <div class="d-flex flex-row user-info"><img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg" alt='' width="40" />
                                                            <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">{this.state.userlist[0]?.first_name} {this.state.userlist ? this.state.userlist[0].last_name :""}</span><span class="date text-black-50">Shared publicly - {this.state.userlist ? this.state.userlist[0].created_at:""}</span></div>
                                                        </div>
                                                        <div class="mt-2">
                                                            <h5>{this.state.userlist ? this.state.userlist[0].complaint_reason :""}</h5>
                                                            <p class="comment-text">{this.state.userlist ? this.state.userlist[0].description :""}</p>
                                                            <p class="image_costm">
                                                                {tableData}
                                                            </p>
                                                            
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="bg-white">
                                                        <h4 style={{textAlign:"center"}}>Comments</h4>
                                                        <hr/>
                                                        {commentData}
                                                        {/* <p style={{position: "relative", left: "30px", color: "blue"}}>dsfsdfsf</p>
                                                        <p style={{position: "relative", right: "30px", color: "Red", textAlign: "right"}}>dsfsdfsf</p> */}
                                                    </div>
                                                    <div class="bg-light p-2">
                                                        <label>Reply</label>
                                                        <br />
                                                        <form id="add_banner" onSubmit={(e) => this.addComment_api(e)}>
                                                            <div class="d-flex flex-row align-items-start">
                                                                <textarea class="form-control ml-1 shadow-none textarea" name="comments" onChange={(e) => this.handleChange1(e)} required></textarea>
                                                                
                                                            </div>
                                                              
                                                                
                                                            <Files
                                                                    className='file_one'
                                                                    onChange={this.onFilesChange}
                                                                    onError={this.onFilesError}
                                                                    accepts={['image/png', '.jpg', '.jpeg', '.pdf', 'audio/*']}
                                                                    multiple
                                                                    maxFileSize={10000000}
                                                                    minFileSize={0}
                                                                    clickable
                                                                    >
                                                                    {this.state.image_url ? <img src={this.state.image_url} alt={this.state.image_url} style={{ height: "50px" }} /> : <span class="file_one " style={{ border: "1px solid", position: "relative", top: "10px", left: "5px", padding: "5px", cursor: "pointer"}}>upload Attach</span>}
                                                                </Files>
                                                            <div class="mt-2 text-right">
                                                              
                                                                
                                                                <button class="btn btn-primary btn-sm shadow-none" type="submit">Post comment</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <Footers />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
