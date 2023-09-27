import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clear } from "../../redux/cartSlice";
import { orderclear } from "../../redux/orderSlice";
import apiClient from "../../api/client";
import Lottie from "react-lottie";
import animationData2 from "../../lottie/payment-processing.json";
import swal from "sweetalert";

const OrderSuccess = () => {
  const [modal, setModal] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState();
  const items = useSelector((state) => state.order.order);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    status();
  }, []);

  const status = async () => {
    const Id = searchParams.get("paymentId");

    const { data } = await apiClient.post("/payment/getPaymentStatus", {
      invoiceId: Id,
    });

    setPaymentStatus(data.Data.InvoiceStatus);
    if (data.Data.InvoiceStatus === "Paid" && items.length === 1) {
      //create order if payment success
      const result = await apiClient.post("/orders/create-order", {
        orderItems: items[0].orderItems,
        shippingAddress: items[0].shippingAddress,
        paymentMethod: "Online",
        itemsPrice: items[0].itemsPrice,
        taxPrice: items[0].taxPrice,
        shippingPrice: items[0].shippingPrice,
        totalPrice: items[0].totalPrice,
        deliveryStatus: "Processing",
        userId: items[0].userId,
        deliverySlot: items[0].deliverySlot,
      });
      if (result.ok) {
        dispatch(clear());
        dispatch(orderclear());
        setModal(false);
      }
    } else {
      swal("Payment Error");
      dispatch(orderclear());
      setModal(false);
    }
  };

  return (
    <>
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
        <div className="orderSuccess">
          {paymentStatus === "Paid" ? (
            <div>
              <CheckCircleIcon />
              <Typography>Your Order has been Placed successfully </Typography>
              <Link to="/myorders">View Orders</Link>
            </div>
          ) : (
            <div>
              <NotInterestedIcon />
              <Typography>
                Payment Failed with status: {paymentStatus}{" "}
              </Typography>
              <Link to="/myorders">View Orders</Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderSuccess;
