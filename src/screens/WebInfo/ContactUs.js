import React from "react";
import map from "../../assets/map.png";
import "./ContactUs.css";
import Footer from "../../components/Footer";

const ContactUs = () => {
  const url = "https://goo.gl/maps/QEQcUESJqchJBxWq9";
  return (
    <div style={{ marginTop: "130px" }}>
      <div className="contactus-wrapper">
        <div className="contactus-info">
          <h2>Contact Us</h2>
          <br />
          <br />
          <p>Telephone No: +974-30014946</p> <br />
          <p>Email: info@fiora.qa</p> <br />
          <p> Address: Al Matar Al Qadeem St, Doha, Qatar</p>
          <br />
          <br />
          <button
            className="store-locator-btn"
            onClick={() => {
              window.open(url, "_blank").focus();
            }}
          >
            Locate Store
          </button>
        </div>
        <div className="contactus-map">
          <img src={map} />
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default ContactUs;
