import React from "react";
import Footer from "./../../components/Footer";
import dog from "../../assets/dog.jpg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div style={{ marginTop: "190px" }}>
      <h1 style={{ textAlign: "center", padding: "20px" }}>About Us</h1>
      <div className="aboutus-content">
        <p
          style={{
            maxWidth: "1024px",
            margin: "0 auto",
          }}
        >
          Our story revolves around the live of one key individual. Chasing his
          hobby & passion, he started on parallel paths that eventually
          converged. This is the beautiful formation story of Fiora Trading Our
          story begins in the developed city of Doha Qatar, where a young boy is
          enchanted by the energy and the liveliness of trade. Fiora pets is a
          leading retailer of aquatic, and pet supplies with a spectacular
          record of providing top-quality products and impartial advice to pet
          keepers. We’ve been in the business for over 2 years and growing to
          become one of the Qatar specialist online pet suppliers and retailer.
          Our passion for aquariums, cats, Dogs reptiles, and other pets has
          seen us launch many brands. Fiora aims to be your one stop shop for
          all your aquarium needs and all kind of your pet products need and now
          we are happy to offering people to order our products via online and
          get them delivered to your door step. Fiora trading also undertakes a
          special projects that include supply of public aquariums and office
          aquariums projects,
        </p>
        <img src={dog} />
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
