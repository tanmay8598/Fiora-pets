import React, { Fragment, useState } from "react";
import "./Shipping.css";
import MetaData from "../../components/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import apiClient from "./../../api/client";
import useAuth from "./../../auth/useAuth";
import swal from "sweetalert";
import Select from "react-select";

const options = [
  { value: "12pm-2pm", label: "12pm-2pm" },
  { value: "2pm-4pm", label: "2pm-4pm" },
  { value: "4pm-6pm", label: "4pm-6pm" },
  { value: "6pm-8pm", label: "6pm-8pm" },
  { value: "8pm-10pm", label: "8pm-10pm" },
  { value: "10pm-12am", label: "10pm-12am" },
];

const Shipping = () => {
  const { user, logIn } = useAuth();
  const [slot, setSlot] = useState();
  const [address, setAddress] = useState(
    user ? user.shippingAddress.address : ""
  );
  const [city, setCity] = useState(user ? user.shippingAddress.city : "");
  const [zone, setZone] = useState(user ? user.shippingAddress.zone : "");
  const [region, setRegion] = useState(user ? user.shippingAddress.region : "");
  const [country, setCountry] = useState(
    user ? user.shippingAddress.country : ""
  );

  const [phoneNo, setPhoneNo] = useState(
    user ? user.shippingAddress.mobileNumber : ""
  );
  const [email, setEmail] = useState(user ? user.shippingAddress.email : "");

  const navigate = useNavigate();

  const shippingSubmit = async (e) => {
    e.preventDefault();

    if (phoneNo.length < 8 || phoneNo.length > 8) {
      swal("Phone Number should be 8 digits without country code");
      return;
    }

    if (slot) {
      //save shipping add in user model
      const { data } = await apiClient.post("/users/saveshippingaddress", {
        userId: user.id,
        shippingAddress: {
          address,
          city,
          zone,
          region,
          country,
          mobileNumber: phoneNo,
          email,
        },
      });

      logIn(data.token);

      navigate("/confirm-order", {
        state: {
          shippingAddress: {
            address,
            city,
            zone,
            region,
            country,
            mobileNumber: phoneNo,
            email,
          },

          slot,
        },
      });
    } else {
      swal("Select Slot");
    }
  };

  const handleChange = (slot) => {
    setSlot(slot.value);
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <CheckoutSteps activeStep={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingBottom: "10px",
              }}
            >
              {/* <PhoneIcon /> */}
              <label style={{ marginRight: "30px" }}>Delivery Slot:</label>
              <Select
                options={options}
                placeholder="Delivery Slot"
                value={slot?.value}
                onChange={handleChange}
              />
            </div>
            <div>
              {/* <HomeIcon /> */}
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="Zone"
                required
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              />
            </div>
            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="Region"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </div>
            <div>
              {/* <LocationCityIcon /> */}
              <input
                type="text"
                placeholder="Country"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              {/* <PhoneIcon /> */}
              <input
                type="mobile"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="8"
              />
            </div>
            <div>
              {/* <PhoneIcon /> */}
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="10"
              />
            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={address ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
