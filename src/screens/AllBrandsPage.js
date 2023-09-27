import React from "react";
import Brand from "../components/Brand";
import Footer from "../components/Footer";

const AllBrandsPage = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      <h1 style={{ textAlign: "center", paddingBottom: "20px" }}>
        All Brands✨
      </h1>
      <Brand />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default AllBrandsPage;
