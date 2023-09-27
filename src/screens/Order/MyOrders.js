import React, { useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import apiClient from "./../../api/client";
import useAuth from "./../../auth/useAuth";
import "./MyOrder.css";
import Pagination from "@mui/material/Pagination";

const MyOrders = () => {
  const [isloaded, setIsLoaded] = useState(false);
  const [getList, setGetList] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const { user } = useAuth();
  useEffect(() => {
    fetchProducts();
  }, [user, currentPageNo]);

  const fetchProducts = async () => {
    setIsLoaded(true);
    if (user) {
      const { data } = await apiClient.get("/orders/myorders", {
        userId: user?.id,
        pageNumber: currentPageNo,
      });

      setGetList(data);
      setIsLoaded(false);
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main style={{ marginTop: "150px", marginBottom: "100px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-9 col-lg-6">
              <h2 className="mt-30 page-title">My Orders</h2>
            </div>
          </div>

          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mt-30 mb-30">
              <div className="card-body-table">
                <div className="table-responsive">
                  <table className="table ucp-table table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>#Order</th>
                        <th style={{ width: "200px" }}>Status</th>
                        <th style={{ minWidth: "200px" }}>Order Placed</th>
                        <th>Delivery Slot</th>
                        <th>Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isloaded !== true
                        ? getList?.map((row, index) => {
                            const date = new Date(row.updatedAt).toDateString();
                            const time = new Date(
                              row.updatedAt
                            ).toLocaleTimeString();

                            return (
                              <>
                                <tr key={index}>
                                  <td>{row._id}</td>

                                  <td>{row.deliveryStatus}</td>

                                  <td>{date}</td>
                                  <td>{row?.deliverySlot}</td>

                                  <td>
                                    <Link to="/order-detail" state={row}>
                                      <Typography className="edit-btn">
                                        <i className="fas fa-edit" />
                                      </Typography>
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        : "Loading..."}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={currentPageNo + 10}
              page={currentPageNo}
              siblingCount={1}
              color="primary"
              onChange={(e, value) => setCurrentPageNo(value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyOrders;
