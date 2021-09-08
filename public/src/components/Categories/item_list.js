import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import SweetAlert from 'react-bootstrap-sweetalert';
import Pagination from '../pagination/pagination';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Files from 'react-files'
import {BaseURL} from '../base_url';

export default class item_list extends Component {
    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,
        item_id: '',
        item_name: '',
        cat_id: '',
        price: '',
        // m_price: '',
        // l_price: '',
        discount: '',
        qty: '',
        weight_type: '',
        user_type: '',
        category_tab: '',
        howTouse: '',
        description: '',

        deletesuccess: '',
        deletemess_err: '',

        deleteValid: false,
        successs: false,
        additemsuccess: false,
        changestatus: false,
        changestatusdone: false,
        categories: [],
        category_id: "",
        selectedOption: "",
        c_id: 0,
    }

    componentDidMount = () => {
        this.getitem_api();
        this.getcategory_api();
    }
    onFilesChange = (files) => {
        this.colse_mess();
        if (files[0]) {
            console.log(files)
            this.setState({
                image: files[0],
                image_url: URL.createObjectURL(files[0]),
            })
        }
        else {
            this.setState({
                image: '',

            })
        }

    }


    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    getcategory_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-categoriesbystatus`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                console.log("result.data?.data", result.data?.data);
                if (result.data?.data) {
                    this.setState({
                        categories: result.data.data
                    })
                }
                if (result.data?.data.message === "Something Went Wrong") {
                    this.setState({
                        message: result.data?.data.message
                    })
                } 
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    getitem_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/get-itemes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
                this.setState({
                    usercount: result.data.data.length,
                    userlist: result.data.data
                }) 
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    delete_item = () => {
        const token = localStorage.getItem("token");
        axios
            .get(`${BaseURL}/api/delete_item/${this.state.id_d}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.message === "Record deleted successfully !") {
                    this.setState({
                        deletesuccess: res.data.message,
                        successs: true,
                    })  
                    this.getitem_api();
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        deletemess_err: res.data.message
                    })
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    }
    change_item_status = (id, statusss) => { 
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("item_id", this.state.i_id);
        data.append("status", this.state.i_status);
        axios
            .post(`${BaseURL}/api/change_item_status`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => { 
                this.setState({
                    changestatusdone: true,
                })
                this.getitem_api();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    additem_api = (e) => { 
        e.preventDefault();
        const token = localStorage.getItem("token");

        const data = new FormData();
        data.append("category_id", this.state.cat_id);
        data.append("inventory_name", this.state.item_name);
        data.append("price", this.state.price); 
        data.append("discount", this.state.discount);
        data.append("qty", this.state.qty);
        data.append("weight_type", this.state.weight_type);
        data.append("user_type", this.state.user_type);
        data.append("category_tab", this.state.category_tab);
        data.append("description", this.state.description);
        data.append("howTouse", this.state.howTouse);

        data.append("image", this.state.image);
        axios
            .post(`${BaseURL}/api/${this.state.item_id ? `edit_item/${this.state.item_id}` : `add_item`}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.data.message === "Record Added successfully !") {
                    this.setState({
                        success: res.data.message,
                        additemsuccess: true,
                    }) 
                    this.getitem_api();
                }
                if (res.data.message === "Record Updated successfully !") {
                    this.setState({
                        success: res.data.message,
                        additemsuccess: true,
                    })
                    this.getitem_api();
                }

                if (res.data.message === "You have not updated anything") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.message === "Something Went Wrong") {
                    this.setState({
                        mess_err: res.data.message
                    })
                }
                if (res.data.data.image || res.data.data.inventory_name) {
                    this.setState({
                        banner_image_err: res.data.data.image || res.data.data.inventory_name
                    })
                }
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    handleChange = (e) => {
        this.setState({
            postsPerPage: e.target.value
        })
    }
    edit_item = (id) => {
        const img = this.state.userlist ? this.state.userlist.filter((x) => x.id === id) : "";
        console.log("img", img);
        this.setState({
            item_id: id,
            image_url: img[0].image,
            item_name: img[0].inventory_name,
            price: img[0].price, 
            discount: img[0].discount,
            qty: img[0].qty,
            weight_type: img[0].weight_type,
            howTouse: img[0].howTouse,
            description: img[0].description,
            cat_id: img[0].category_name,
            user_type: img[0].user_type,
            category_tab: img[0].category_tab,
            category_id: img[0].category_id,
            c_id: img[0].id, 
        })
    }

    dismiss = () => {
        this.setState({
            item_id: '',
            image_url: '',
            item_name: '',
            price: '',
            discount: '',
            qty: '',
            weight_type: '',
            howTouse: '',
            description: '',
            cat_id: '',
            user_type: '',
            category_tab: '',
            category_id: '',
            c_id: '',
        })
    }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    handleChange1 = (event) => {
        this.colse_mess();

        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleChange2 = (event) => {
        this.colse_mess();
        const { name, value } = event.target;
        this.setState({ [name]: value });
        if (value) {
            this.setState({
                category_id: value
            })
        }
    }

    colse_mess = () => {
        this.setState({
            banner_image_err: "",
            mess_err: "",
            success: '',
            deletesuccess: '',
            deletemess_err: '',
        })
    }
    change_item_id = (id, status) => {
        this.setState({
            i_id: id,
            i_status: status,
            changestatus: true,
        })
    }

    deleteget_id = (id) => {
        this.setState({
            id_d: id,
            deleteValid: true,
        })
    }
    onCancel = () => {
        if (this.state.additemsuccess === true || this.state.successs === true) {
            window.location.reload();
        }
        this.setState({
            deleteValid: false,
            successs: false,
            additemsuccess: false,
            changestatus: false,
            changestatusdone: false,
        })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }); 
    };



    render() { 

        const { message, loading, categories, c_id, cat_id } = this.state;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : [];

        const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.category_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.inventory_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.user_type.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []

        const tableData = dataFilter ? dataFilter.map((x, i) => (

            <tr id="dataid53" role="row" className="even" key={i}>
                <td className="">{i + 1}</td>
                <td className="sorting_1">{x.category_name}</td>
                <td>{x.inventory_name}</td>
                <td><img src={x.image} className="img-fluid" style={{ maxHeight: "50px" }} alt="" /></td>
                <td>${x.price}.00</td>
                <td>${x.discount}.00</td>
                <td>{x.user_type}</td>
                <td>{x.howTouse}</td>
                <td>{x.description}</td>
                <td>
                    <button className="badge badge-success px-2" onClick={(e) => this.change_item_id(x.id, x.merchant_inventory_status === 1 ? 0 : 1)} style={{ color: "#fff" }}>{x.merchant_inventory_status === 1 ? "Available" : "Un-Available"}</button>
                </td>
                <td>
                    <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false" onClick={(e) => this.edit_item(x.id)}>
                        Edit
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={(e) => this.deleteget_id(x.id)}>
                        Delete
                    </button>
                </td>
            </tr>

        ))
            : ""
        const { deleteValid, successs, additemsuccess, changestatus, changestatusdone, selectedOption, user_type } = this.state;

        const Category_Tab = (
            <>
                {user_type !== "WholeSaler" ?
                    <div className="form-group">
                        <label className="slider_lit col-form-label" for="category_tab" >Category Tab:</label>
                        <select name="category_tab" className="form-control" id="category_tab" onChange={this.handleChange1}
                            required> 
                            <option value="">Select Category</option>
                            <option value="special_orders">Special orders</option>
                            <option value="shipping_outside">Order now</option>
                            <option value="samar_basket">Samar Basket</option>

                        </select>
                    </div>
                    : ""}
            </>
        ) 
        
        return (
            <div>
                {deleteValid ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure?"
                        onConfirm={(e) => this.delete_item(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {successs ? (
                    <SweetAlert
                        success
                        title="deleted successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}
                {additemsuccess ? (
                    <SweetAlert
                        success
                        title="Success"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}


                {changestatus ? (
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, Change it!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="success"
                        cancelBtnText="cancel"
                        title="Are you sure?"
                        onConfirm={(e) => this.change_item_status(e)}
                        onCancel={this.onCancel}
                        focusCancelBtn
                    >
                    </SweetAlert>
                ) : ""}

                {changestatusdone ? (
                    <SweetAlert
                        success
                        title="You have changed status successfully"
                        onConfirm={this.onCancel}
                    >
                    </SweetAlert>)
                    : ""}
                <div className="page">
                    {/* <!-- Main Navbar--> */}

                    <Headers />

                    <div className="page-content d-flex align-items-stretch">
                        {/* <!-- Side Navbar --> */}

                        <Sidebars />
                        <div className="content-inner">
                            <div className="container-fluid">
                                <div className="model">
                                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                                        Add Item
                                    </button> */}
                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Add New Item</h4>
                                                    <button type="button" className="close" data-dismiss="modal" onClick={this.dismiss}>&times;</button>
                                                </div>
                                                {this.state.banner_image_err || this.state.mess_err ?
                                                    <div className="alert alert-danger alert-block">
                                                        <button type="button" onClick={this.colse_mess} className="close">×</button>
                                                        <strong>
                                                            {this.state.banner_image_err ? this.state.banner_image_err : ""}
                                                            {this.state.mess_err ? this.state.mess_err : ""}
                                                        </strong>
                                                    </div>
                                                    : " "}
                                                {this.state.success ?
                                                    <div className="alert alert-success alert-block">
                                                        <button type="button" onClick={this.colse_mess} className="close">×</button>
                                                        <strong>
                                                            {this.state.success ? this.state.success : ""}

                                                        </strong>
                                                    </div>
                                                    : " "}


                                                <form onSubmit={(e) => this.additem_api(e)}>
                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="cat_id" >Category:</label>
                                                            {/* {c_id === 0 ? */}
                                                            <select name="cat_id" className="form-control" id="cat_id" value={this.state.category_id} onChange={this.handleChange2} required>
                                                                <option value="">Select Category</option>
                                                                {categories ? categories?.map((x, i) => (
                                                                    <option value={x.id}>{x.category_name}</option>
                                                                ))
                                                                    : ""}
                                                            </select>
                                                            {/* :
                                                                <select name="cat_id" className="form-control" id="cat_id" onChange={this.handleChange1} required>
                                                                    <option value="">{cat_id ? cat_id : "Select Category"} </option>
                                                                    {categories ? categories?.map((x, i) => (
                                                                        <option value={x.id}>{x.category_name}</option>
                                                                    ))
                                                                        : ""}
                                                                </select>

                                                            } */}


                                                        </div>
                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="get_title">Item Name:</label>
                                                            <input type="text" className="form-control" id="get_title" name="item_name" placeholder="Item Name" onChange={(e) => this.handleChange1(e)} value={this.state.item_name ? this.state.item_name : ""} required />
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="from_f">
                                                                <div className="from_b">
                                                                    <label className="slider_lit col-form-label" for="get_title"> Price:</label>
                                                                    <input type="text" className="form-control" id="get_title" name="price" placeholder=" Price" onChange={(e) => this.handleChange1(e)} value={this.state.price ? this.state.price : ""} required />
                                                                </div>
                                                                <div className="from_bq">
                                                                    <label className="slider_lit col-form-label" for="get_title">Discount:</label>
                                                                    <input type="text" className="form-control" id="get_title" name="discount" placeholder="0%" onChange={(e) => this.handleChange1(e)} value={this.state.discount ? this.state.discount : ""} required />
                                                                </div>
                                                                {/* <div className="from_b">
                                                                    <label className="slider_lit col-form-label" for="m_price">Medium Price:</label>
                                                                    <input type="text" className="form-control" id="m_price" name="m_price" placeholder="Medium Price" onChange={(e) => this.handleChange1(e)} value={this.state.m_price ? this.state.m_price : ""} required />
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <div className="from_f">
                                                                <div className="from_b">
                                                                    <label className="slider_lit col-form-label" for="l_price">Large Price:</label>
                                                                    <input type="text" className="form-control" id="l_price" name="l_price" placeholder="Large Price" onChange={(e) => this.handleChange1(e)} value={this.state.l_price ? this.state.l_price : ""} required />
                                                                </div>
                                                                <div className="from_bq">
                                                                    <label className="slider_lit col-form-label" for="get_title">Discount:</label>
                                                                    <input type="text" className="form-control" id="get_title" name="discount" placeholder="0%" onChange={(e) => this.handleChange1(e)} value={this.state.discount ? this.state.discount : ""} required />
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        <div className="form-group">
                                                            <div className="from_f">
                                                                <div className="from_b">
                                                                    <label className="slider_lit col-form-label" for="get_title">Qty:</label>
                                                                    <input type="text" className="form-control" id="get_title" name="qty" placeholder="Quantity" onChange={(e) => this.handleChange1(e)} value={this.state.qty ? this.state.qty : ""} required />
                                                                </div>
                                                                <div className="from_bq">
                                                                    <label className="slider_lit col-form-label" for="weight_type">Weight type:</label>
                                                                    <input type="text" className="form-control" id="weight_type" name="weight_type" placeholder="Weight type" value={this.state.weight_type} onChange={this.handleChange1} />
                                                                    {/* <select name="weight_type" className="form-control" id="weight_type" onChange={this.handleChange1} required value={this.state.weight_type}>
                                                                        <option value="">Select Category</option>
                                                                        <option value="kg">kg</option>
                                                                        <option value="ltr">ltr</option>
                                                                        <option value="packet">Packet</option>
                                                                    </select> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="user_type" >User Type:</label>
                                                            <select name="user_type" className="form-control" id="user_type" onChange={this.handleChange1} required value={this.state.user_type}>
                                                                <option value="">Select User Type</option>
                                                                {/* <option value="all">All</option> */}
                                                                <option value="WholeSaler">WholeSaler</option>
                                                                <option value="Retailer">Retailer</option>
                                                            </select>
                                                        </div>


                                                        {Category_Tab}



                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="image">Select Item images:</label>
                                                            <Files
                                                                className='form-control ex'
                                                                onChange={this.onFilesChange}
                                                                onError={this.onFilesError}
                                                                accepts={['image/png', '.jpg', '.jpeg', '.pdf', 'audio/*']}
                                                                multiple
                                                                maxFileSize={10000000}
                                                                minFileSize={0}
                                                                clickable
                                                            >
                                                                {this.state.image_url ? <img src={this.state.image_url} alt={this.state.image_url} style={{ height: "66px" }} /> : "click to upload"}
                                                            </Files>
                                                            {/* <input type="file" className="form-control ex" name="image" id="image" accept="image/*" /> */}
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="description">Description:</label>
                                                            <textarea className="form-control" id="description" name="description" placeholder="Note on the Product" onChange={(e) => this.handleChange1(e)} value={this.state.description ? this.state.description : ""} required >
                                                            </textarea>
                                                        </div>

                                                        <div className="form-group">
                                                            <label className="slider_lit col-form-label" for="howTouse">Description:</label>
                                                            <textarea className="form-control" id="howTouse" name="howTouse" placeholder="How To use" onChange={(e) => this.handleChange1(e)} value={this.state.howTouse ? this.state.howTouse : ""} required >
                                                            </textarea>
                                                        </div>

                                                        <div className="gallerys"></div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button className="btn btn-secondary" data-dismiss="modal" onClick={this.colse_mess} onClick={this.dismiss}>Close</button>
                                                        <button type="submit" className="btn btn-primary">Save</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="dashboard-counts no-padding-bottom mio">
                                <div className="container-fluid">
                                    <div className="row bg-white has-shadow">
                                        <div className="col-xl-3 col-sm-6">
                                            <div className="card gradient-4">
                                                {/* <a href="#"> */}
                                                <Link to="/Item-List" >
                                                    <div className="card-body_one">
                                                        <h3 className="card-title_one">Items</h3>
                                                        <div className="d-inline-block">
                                                            <h2 className="text-one_one">{this.state.usercount}</h2>
                                                        </div>
                                                        <span className="float-right display-5 opacity-5" style={{ color: "#fff" }}><i className="fa fa-cutlery"></i></span>
                                                    </div>
                                                </Link>
                                                {/* </a> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* <section class="slip_text">
                                <div class="container-fluid">
                                    <div class="row bg-white has-shadow one">
                                        <div class="col-sm-5">
                                            <div class="anny_text">
                                                <div class="input-group">
                                                    <div class="form-outline one">
                                                        <input type="search" id="form1" class="form-control" placeholder="Search Id Number & Name" onChange={(e) => this.searchSpace(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-7">
                                            <div class="anny_text_one">
                                                <div class="deteid">
                                                    <div class="date_text">
                                                        <h6>From</h6>
                                                    </div>
                                                </div>
                                                <div class="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" />
                                                        <input class="sumfive" type="submit" value="Submit" />
                                                    </form>
                                                </div>
                                                <div class="deteid">
                                                    <div class="date_text">
                                                        <h6>TO</h6>
                                                    </div>
                                                </div>
                                                <div class="deteid">
                                                    <form action="/action_page.php">
                                                        <label for="birthday"></label>
                                                        <input type="date" id="birthday" name="birthday" />
                                                        <input class="sumfive" type="submit" value="Submit" />
                                                    </form>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section> */}
                            {this.state.deletemess_err ?
                                <div className="alert alert-danger alert-block">
                                    <button type="button" onClick={this.colse_mess} className="close">×</button>
                                    <strong>
                                        {this.state.deletemess_err ? this.state.deletemess_err : ""}

                                    </strong>
                                </div>
                                : " "}
                            {this.state.deletesuccess ?
                                <div className="alert alert-success alert-block">
                                    <button type="button" onClick={this.colse_mess} className="close">×</button>
                                    <strong>
                                        {this.state.deletesuccess ? this.state.deletesuccess : ""}

                                    </strong>
                                </div>
                                : " "}
                            <section className="client no-padding-bottom miop">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="series_lo">
                                                <div className="series_one">
                                                    <div className="series_five">
                                                        <div className="series_three">
                                                            <div className="item_yro">
                                                                <h6>All Item</h6>
                                                            </div>
                                                            <div class="item_delp">
                                                                <span><div class="form-outline one">
                                                                    <input type="search" id="form1" class="form-control" placeholder="Search Id Number & Name" onChange={(e) => this.searchSpace(e)} />
                                                                </div></span>
                                                                <span>
                                                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="static" data-keyboard="false">
                                                                        Add Item
                                                                    </button>
                                                                </span>

                                                            </div>
                                                        </div>
                                                        <table className="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="#: activate to sort column ascending" style={{ width: "25px" }} >#</th>
                                                                    <th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Category: activate to sort column descending" style={{ width: "50px" }} aria-sort="ascending">Category</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Product Name: activate to sort column ascending" style={{ width: "50px" }}>Product Name</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Product Name: activate to sort column ascending" style={{ width: "100px" }}>Product image</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending" style={{ width: "57px" }}> Price</th>
                                                                    {/* <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending" style={{ width: "57px" }}>Medium Price</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Price: activate to sort column ascending" style={{ width: "57px" }}>Large Price</th> */}
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Delivery Time: activate to sort column ascending" style={{ width: "129px" }}>Discount</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="howTouse: activate to sort column ascending" style={{ width: "57px" }}>User Type</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="howTouse: activate to sort column ascending" style={{ width: "57px" }}>How To Use</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="description Time: activate to sort column ascending" style={{ width: "129px" }}>Note on the Product</th>

                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style={{ width: "82px" }}>Status</th>
                                                                    <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "139px" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}
                                                            </tbody>
                                                        </table>
                                                        <div className="row" style={{ width: "100%" }}>

                                                            <div className="col-md-6" >
                                                                <h3 className="total_rec"> Show once  </h3>
                                                                <select id="dropdown_custom" onChange={this.handleChange} >
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="80">80</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-6" >
                                                                <div className="superpt">
                                                                    <Pagination postsPerPage={this.state.postsPerPage} totalPosts={length}
                                                                        paginate={this.paginate} currentPage={this.state.currentPage} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 75 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" className="page-link">Previous</a></li><li className="paginate_button page-item"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" className="page-link">1</a></li><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" className="page-link">2</a><li className="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="8" tabindex="0" className="page-link">Next</a></li></ul></div></div></div> */}
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
