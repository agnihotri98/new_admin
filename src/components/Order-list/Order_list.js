import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SweetAlert from 'react-bootstrap-sweetalert';
import Headers from '../Header/header';
import Sidebars from '../Sidebar/sidebar';
import Footers from '../Footer/footer';
import Orders_tab from "./Tabs/Order_listTab";
import Pagination from '../pagination/pagination';
export default class Order_list extends Component {

    state = {
        usercount: '0',
        currentPage: 1,
        postsPerPage: 10,

        checkstatus: false,
        changestatus: false,
        loading: false,
        userlist: [],
        message:"",

    }

    componentDidMount = () => {
        this.getorder_api();
    }

    getorder_api = () => {
        const token = localStorage.getItem("token");
        axios
            .get("http://134.209.157.211/champbakery/public/api/get-order", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => {
         
                console.log("result", result.data);
                if (result.data) {
                    this.setState({
                        // usercount: result?.data?.data?.length,
                        userlist: result?.data?.data.data,
                        loading: true,
                        message: result?.message
                    })
                }
                if (result?.message === "Something Went Wrong") {
                    this.setState({
                        message: result.message
                    })
                }
                // console.log("result", result.data.data);

            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log(err.response);

            });
    }

    
    // changeStatus_api = () => {
    //     // console.log("result", id);
    //     // console.log("result", e.target.value);
    //     // debugger
    //     // e.preventDefault();
    //     const token = localStorage.getItem("token");

    //     const data = new FormData();
    //     data.append("request_id", this.state.orderid);
    //     data.append("status", this.state.orderstatus);

    //     axios
    //         .post("http://134.209.157.211/champbakery/public/api/change_status", data, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //         .then((res) => {

    //             console.log(res);
    //             if (res.data.message === "update Status") {
    //                 this.setState({
    //                     success: res.data.message,
    //                     changestatus: true
    //                 })
    //                 // this.props.history.push('/Slider-List')
    //                 // window.location.reload();
    //                 this.getorder_api();
    //             }
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({ search: keyword });
    };

    handleChange = (e) => {
        this.setState({
            postsPerPage: e.target.value
        })
    }
    handleChange11 = (e) => {
        this.setState({ selectValue: e.target.value });
    }

    paginate = (number) => {
        this.setState({
            currentPage: number
        })
    }

    // change_Status_id = (id, e) => {
    //     this.setState({
    //       orderid: id,
    //       orderstatus: e.target.value,
    //       checkstatus: true,
    //     })
    //   }
    
    //   onCancel = () => {
    //     this.setState({
    //       checkstatus: false,
    //       changestatus: false,
    //     })
    //   }
    render() {
        // const { loading ,userlist ,message }=this.state;
        // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        // const currentPosts = loading === true ? this.state.userlist?.slice(indexOfFirstPost, indexOfLastPost) : [] ;
        // const length = this.state.userlist ? this.state.userlist.length : "";

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.userlist ? this.state.userlist.slice(indexOfFirstPost, indexOfLastPost) : "";
        const length = this.state.userlist ? this.state.userlist.length : "";


        const pending_f = this.state.userlist ? this.state.userlist.filter((x) => x.role === "Retailer") : "";
        const cancel_f = this.state.userlist ? this.state.userlist.filter((x) => x.role === "WholeSaler") : "";
        // console.log("pending_f",pending_f);
        const pending_filter = pending_f ? pending_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.order_number.toLowerCase().includes(this.state.search.toLowerCase()) || x.address.toLowerCase().includes(this.state.search.toLowerCase()) || x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.last_name.toLowerCase().includes(this.state.search.toLowerCase())

        }) : []
        // console.log("pending_filter ", pending_filter);

        const cancel_filter = cancel_f ? cancel_f.filter((x, i) => {
            if (!this.state.search) return x;
            else if (this.state.search) return x.order_number.toLowerCase().includes(this.state.search.toLowerCase()) || x.address.toLowerCase().includes(this.state.search.toLowerCase()) || x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.last_name.toLowerCase().includes(this.state.search.toLowerCase())
        }) : []

        // const dataFilter = currentPosts ? currentPosts?.filter((x, i) => {
        //     if (!this.state.search) return x;
        //     else if (this.state.search) return x.order_number.toLowerCase().includes(this.state.search.toLowerCase()) || x.address.toLowerCase().includes(this.state.search.toLowerCase())
        //     || x.first_name.toLowerCase().includes(this.state.search.toLowerCase()) || x.last_name.toLowerCase().includes(this.state.search.toLowerCase())

        // }) : []
        // // console.log("dataFilter", dataFilter);
        // const tableData = dataFilter ? dataFilter.map((x, i) => (
        //     <tr id="dataid73" role="row" class="odd" key={i}>
        //         <td class="sorting_1">{i + 1}</td>
        //         <td>{x.created_at}</td>
        //         <td>{x.first_name} {x.last_name}</td>
        //         <td>{x.order_number}</td>
        //         <td>{x.address}</td>
        //         <td>
        //             <label class="show_Solo">
        //                 <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0"
        //                     class="form-control form-control-sm one"
        //                     value={x.status}
        //                     // onChange={this.handleChange11}
        //                     onChange={(e) => this.change_Status_id(x.id, e)}>
        //                     <option value="accepted">Accepted</option>
        //                     <option value="processing">Processing </option>
        //                     <option value="onready">On Ready </option>
        //                     <option value="ongoing">Ongoing</option>
        //                     <option value="complete">Delivered</option>
        //                     <option value="cancel">Cancel</option>
        //                 </select>
        //             </label>
        //         </td>
        //         <td>
        //             <span>
        //                 <Link to={`/Order-Detail/${x.id}`} >
        //                     <span className="badge badge-warning">View</span>
        //                 </Link>
        //             </span>
        //         </td>
        //     </tr>
        // ))
        //     :
        //     ""

            const { checkstatus, changestatus } = this.state;
        return (
            <div>

{checkstatus ? (
          <SweetAlert
            warning
            showCancel
            cancelBtnText="cancel"
            confirmBtnText="Yes, update it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are you sure you want to update the status?"
            onConfirm={(e) => this.changeStatus_api(e)}
            onCancel={this.onCancel}
            focusCancelBtn
          >
          </SweetAlert>
        ) : ""}

        {changestatus ? (
          <SweetAlert
            success
            title="Updated successfully"
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
                            {/* <!-- Page Header--> */}
                            <header className="page-header">
                                <div className="container-fluid">
                                    <h2 className="no-margin-bottom">Welcome To Cham</h2>
                                </div>
                            </header>
                            {/* <!-- Dashboard Counts Section--> */}
                            <section class="dashboard-counts no-padding-bottom-op">
                                <div class="container-fluid">
                                    <div class="row bg-white has-shadow">
                                        <div class="col-xl-3 col-sm-6">
                                            <div class="card gradient-3 2">
                                                <Link to="/Order-List" >
                                                    <div class="card-body_one">
                                                        <h3 class="card-title_one">Orders</h3>
                                                        <div class="d-inline-block">
                                                            <h2 class="text-one_one">{this.state.userlist.length ? this.state.userlist.length : ""}</h2>
                                                        </div>
                                                        <span class="float-right display-5 opacity-5" style={{ color: "#fff" }}><i class="fa fa-shopping-cart"></i></span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-sm-6">
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section class="slip_text-op">
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
                                        {/* <div class="col-sm-7">
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

                                        </div> */}
                                    </div>
                                </div>
                            </section>

                            {/* <!-- today order--> */}

                            <section className="client no-padding-bottom-op">
                                <div className="container-fluid">
                                    <div className="row">


                                        <div className="col-sm-12">
                                            <Tabs>
                                                <div className="tab_plas">
                                                    <TabList>
                                                        <Tab>Retailer</Tab>
                                                        <Tab>WholeSaler</Tab>
                                                    </TabList>

                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tabs-1" role="tabpanel">

                                                            <div className="col-lg-12">
                                                                <div className="series_lo">
                                                                    <div className="series_one">
                                                                        <div className="series_five">
                                                                            <div className="series_three">
                                                                                <h6>All Orders</h6>
                                                                            </div>


                                                                            <TabPanel>
                                                                                {/* {tableData} */}
                                                                                <Orders_tab props_data={pending_filter} getorder_api={this.getorder_api} />
                                                                            </TabPanel>

                                                                            <TabPanel>
                                                                                {/* {tableData} */}
                                                                                <Orders_tab props_data={cancel_filter}  getorder_api={this.getorder_api}/>
                                                                            </TabPanel>
                                                                            <div classNameName="row" style={{ width: "100%" }}>

                                                                                <div classNameName="col-md-6" >
                                                                                    <h3 classNameName="total_rec"> Show once  </h3>
                                                                                    <select id="dropdown_custom" onChange={this.handleChange} >
                                                                                        <option value="10">10</option>
                                                                                        <option value="20">20</option>
                                                                                        <option value="40">40</option>
                                                                                        <option value="80">80</option>
                                                                                        <option value="100">100</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div classNameName="col-md-6" >
                                                                                    <div className="gelcoll">
                                                                                    <Pagination postsPerPage={this.state.postsPerPage}
                                                                                     totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} /></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                </div>

                                                            </div>






                                                        </div>

                                                    </div>
                                                </div>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* <section class="client no-padding-bottom">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="series_lo">
                                                <div class="series_one">
                                                    <div class="series_five">
                                                        <div class="series_three">
                                                            <h6>All Orders</h6>
                                                        </div>
                                                        <table class="table table-striped table-bordered zero-configuration dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                                            <thead>
                                                                <tr role="row">
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="descending" aria-label="#: activate to sort column ascending" style={{ width: "9px" }}>#</th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Created at: activate to sort column ascending" style={{ width: "50px" }}>Created at</th>

                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style={{ width: "58px" }}>User Name</th>
                                                                  
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Number: activate to sort column ascending" style={{ width: "78px" }}>Order Number</th>

                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Order Status: activate to sort column ascending" style={{ width: "44px" }}>location</th>

                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Change Order Status: activate to sort column ascending" style={{ width: "84px" }}>Change Order Status</th>
                                                                    <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "41px" }}>Action</th></tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData}

                                                            </tbody>
                                                        </table>
                                                        <div classNameName="row" style={{ width: "100%" }}>
                                                          
                                                            <div classNameName="col-md-6" >
                                                                <h3 classNameName="total_rec"> Show once  </h3>
                                                                <select id="dropdown_custom" onChange={this.handleChange} >
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="80">80</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </div>
                                                            <div classNameName="col-md-6" >
                                                               <div className="homepi">
                                                                <Pagination postsPerPage={this.state.postsPerPage}
                                                                 totalPosts={length} paginate={this.paginate} currentPage={this.state.currentPage} />

                                                               </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                            <Footers />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
