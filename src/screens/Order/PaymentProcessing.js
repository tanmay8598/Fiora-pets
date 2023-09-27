import React from "react";
import Lottie from "react-lottie";
import apiClient from "../../api/client";
import animationData from "../../lottie/emptyBox.json";

const PaymentProcessing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const status = async () => {
    const { data } = await apiClient.post("/payment/getPaymentStatus", {
      invoiceId: "060683448882211663",
    });

    console.log(data);
    // if (data.Data.InvoiceStatus == 'Paid') {
    //   //create order if payment success
    //   const result = await apiClient.post("/orders/create-order", {
    //     orderItems,
    //     shippingAddress,
    //     paymentMethod: "Online",
    //     itemsPrice: subTotal,
    //     taxPrice,
    //     shippingPrice,
    //     totalPrice,
    //     deliveryStatus: "Processing",
    //     userId: user.id,
    //   });
    //   if (result.ok) {

    //     dispatch(clear());
    //     navigate("/success");
    //   }
    //   setUploadVisible(false);
    // } else {
    //   swal("Payment Error");
    //   setUploadVisible(false);
    // }
  };

  return (
    <div>
      <div
        style={{
          marginTop: "150px",
        }}
      >
        <Lottie options={defaultOptions} height={200} width={200} />
        <h3 style={{ textAlign: "center" }}>
          Payment Processing... please wait
        </h3>
      </div>
    </div>
  );
};

export default PaymentProcessing;
