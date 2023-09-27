import React, { Fragment, useState, useEffect } from "react";
import "./Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../../components/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Button } from "@mui/material";
import apiClient from "./../../api/client";
import useAuth from "./../../auth/useAuth";

import animationData from "../../lottie/delivery.json";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie";
import { clear } from "../../redux/cartSlice";
import { useSearchParams } from "react-router-dom";
import { add, orderclear } from "../../redux/orderSlice";

import animationData2 from "../../lottie/payment-processing.json";

const Payment = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useDispatch();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentId, setPaymentId] = useSearchParams();
  // let windowreference = window.open()

  useEffect(() => {
    dispatch(orderclear());
  }, []);

  const { user } = useAuth();
  const location = useLocation();
  const orderItems = location.state.orderItems;
  const shippingAddress = location.state.shippingAddress;
  const slot = location.state.slot;

  const subTotal = location.state.subTotal;

  var taxPrice = 0;
  var shippingPrice = 0;
  var totalPrice = (taxPrice + Number(subTotal)).toFixed(2);
  const city = shippingAddress.city.toLowerCase();

  if (city === "doha") {
    if (subTotal >= 99) {
      shippingPrice = 0;
    } else {
      shippingPrice = 10;
    }
  } else {
    if (subTotal >= 149) {
      shippingPrice = 0;
    } else {
      shippingPrice = 20;
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setUploadVisible(true);

    const result = await apiClient.post("/orders/create-order", {
      orderItems,
      shippingAddress,
      paymentMethod: "COD",
      itemsPrice: subTotal,
      taxPrice,
      shippingPrice,
      totalPrice,
      deliveryStatus: "Processing",
      userId: user.id,
      deliverySlot: slot,
    });
    if (result.ok) {
      swal("Order Placed!");
      dispatch(clear());
      dispatch(orderclear());
      navigate("/myorders");
    }

    setUploadVisible(false);
  };

  const initiatePayment = async () => {
    //payment processing loader

    dispatch(
      add({
        orderItems,
        shippingAddress,
        paymentMethod: "Online",
        itemsPrice: subTotal,
        taxPrice,
        shippingPrice,
        totalPrice,
        deliveryStatus: "Processing",
        userId: user.id,
        deliverySlot: slot,
      })
    );
    setModal(true);
    const result = await apiClient.post("/payment/executePayment", {
      userName: user?.name,
      CustomerEmail: shippingAddress.email,
      CustomerMobile: shippingAddress.phone,
      totalPrice,
    });

    const url = result.data.Data.PaymentURL;
    window.open(url, "_top");
    // windowreference.location = url
  };

  // const status = async () => {
  //  const Id = searchParams.get("paymentId")
  //  console.log(Id)
  //   const { data } = await apiClient.post("/payment/getPaymentStatus", {
  //     invoiceId: Id,
  //   });

  //   if (data.Data.InvoiceStatus === "Paid") {
  //     //create order if payment success
  //     const result = await apiClient.post("/orders/create-order", {
  //       orderItems,
  //       shippingAddress,
  //       paymentMethod: "Online",
  //       itemsPrice: subTotal,
  //       taxPrice,
  //       shippingPrice,
  //       totalPrice,
  //       deliveryStatus: "Processing",
  //       userId: user.id,
  //       deliverySlot: slot,
  //     });
  //     if (result.ok) {
  //       dispatch(clear());
  //       navigate("/success");
  //     }
  //     setModal(false);
  //   } else {
  //     swal("Payment Error");
  //     setModal(false);
  //   }
  // };

  return (
    <Fragment>
      {modal ? (
        <div
          style={{
            marginTop: "200px",
          }}
        >
          <Lottie options={defaultOptions2} height={200} width={200} />
          <h3 style={{ textAlign: "center" }}>
            Payment Processing... please wait
          </h3>
        </div>
      ) : (
        <>
          <MetaData title="Payment" />
          <CheckoutSteps activeStep={2} />
          {uploadVisible ? (
            <div style={{ width: "100%", margin: "0 auto" }}>
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          ) : (
            <div className="payment-container">
              <div className="box1">
                <div className="delivery-wrapper">
                  <h3>1. Delivery address</h3>
                  <br />
                  <div className="info">
                    <p>To: {user.name}</p>
                    <p>
                      {shippingAddress.address}, {shippingAddress.region},{" "}
                      {shippingAddress.zone}, {shippingAddress.city},{" "}
                      {shippingAddress.country}
                    </p>
                  </div>
                </div>
                <br />
                <div className="total-wrapper">
                  <h3>2. Order summary</h3>
                  <br />
                  <div className="info">
                    <h6>Order Total</h6>
                    <p>QAR {totalPrice} /-</p>
                  </div>
                </div>
              </div>
              <div className="paymentContainer">
                <div>
                  <h3 style={{ marginBottom: "20px" }}>
                    3. Select a payment method
                  </h3>
                </div>
                <div className="btn-wrapper">
                  <div className="btn-container">
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      style={{
                        width: "260px",
                        backgroundColor: "#ef6c00",
                        fontWeight: "600",
                      }}
                    >
                      Cash on Delivery
                    </Button>
                  </div>
                  <div className="btn-container">
                    <Button
                      variant="outlined"
                      onClick={initiatePayment}
                      style={{
                        width: "260px",
                        backgroundColor: "#ef6c00",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      Online/Card
                    </Button>
                  </div>{" "}
                  <div className="btn-container">
                    {/* <Button variant="outlined" onClick={status}>
                check status
              </Button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default Payment;
