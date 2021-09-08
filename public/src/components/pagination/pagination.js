import React, { useState } from 'react';
import { Link } from 'react-router-dom'
function pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i);
    }
console.log("pageNumber", currentPage);
    return (
        <div className="custom_pag">
            <nav>
                <ul className="pagination" >
                    <li className="perv_back">
                        <span className={currentPage === 1 ? 'disabled' : ''} style={{ color: currentPage === 1 ? 'gray' : 'black', position: "relative", fontWeight: "500", fontSize: "21px", bottom: "3px" }} onClick={() => paginate(currentPage - 1)}> &laquo; </span>
                    </li>  &nbsp;

                    {pageNumber.length > 0 ?
                        pageNumber.map((x) =>
                            <li key={x} className={`page-item ${currentPage === x ? "Active" : ""}`}>
                                <span onClick={() => paginate(x)} className={`page-link ${currentPage === x ? "Active" : ""}`} style={{ background: currentPage === x ? "rgb(23 162 184)" : "white", color: currentPage === x ? "white" : "black" }}>
                                    {/* {getdata(x)} */}
                                    {x}
                                    {/* {a} */}
                                    {/* {x === currentPage ? currentPage : ""}
                                    {currentPage !== x ? currentPage + 2 ? x : "" : " "}

                                    {x + pageNumber.length ? a  : '11'} */}
                                </span>
                            </li>
                        ) : " "} &nbsp;
                    <li className="Next_page">
                        <Link className={currentPage === pageNumber.length ? 'disabled' : ''} style={{ color: currentPage === pageNumber.length ? 'gray' : 'black', position: "relative", fontWeight: "500", fontSize: "21px", bottom: "3px" }} onClick={() => paginate(currentPage + 1)}> &raquo; </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default pagination;