import React from "react";
import { useLocation } from "react-router-dom";

import "./OrderDetail.css";

const OrderDetail = () => {
  const location = useLocation();
  const order = location.state;

  const date = new Date(order.updatedAt).toDateString();
  const time = new Date(order.updatedAt).toLocaleTimeString();

  return (
    <div id="layoutSidenav_content">
      <main style={{ marginTop: "150px" }}>
        <div className="container-fluid">
          <div>
            <div className="col-lg-5 col-md-9 col-lg-6">
              <h2 className="mt-30 page-title">Order Detail</h2>
            </div>
          </div>
          <div
            className="col-lg-12 col-md-12 mobile-container"
            style={{
              display: "flex",
              // justifyContent: "space-between",
            }}
          >
            <div className=" card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>Order Id: {order?._id}</h4>
              </div>
              <div className="card-title-2">
                <h4>Order Place On: {date}</h4>
              </div>
              <div className="card-title-2">
                <h4>Order Place Time: {time}</h4>
              </div>
              <div className="card-title-2">
                <h4>Order Status: {order?.deliveryStatus}</h4>
              </div>
            </div>
            <div className=" card-static-2 mt-30 mb-30">
              <div className="card-title-2">
                <h4>Payment Mode: {order?.paymentMethod}</h4>
              </div>
              <div className="card-title-2">
                <h4>Total Amount: QAR {order?.totalPrice}/-</h4>
              </div>
              <div className="card-title-2">
                <h4>Delivery Slot: {order?.deliverySlot}/-</h4>
              </div>

              <div className="card-title-2">
                <h4>
                  Shipping Address: {order.shippingAddress.address},
                  {order.shippingAddress.zone},{order.shippingAddress.city},
                  {order.shippingAddress.region},{order.shippingAddress.country}
                </h4>
              </div>
              <div className="card-title-2">
                <h4>
                  Contact Info: {order.shippingAddress.mobileNumber},
                  {order.shippingAddress.email}
                </h4>
              </div>
            </div>
          </div>
          <div className="card-body-table">
            <div className="table-responsive">
              <table className="table ucp-table table-hover">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Image</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ width: "500px" }}>{row.name}</td>
                        <td>
                          <div className="cate-img-5">
                            <img src={row.image} alt="product-name" />
                          </div>
                        </td>
                        <td>{row.qty}</td>
                        <td>QAR {row.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetail;
