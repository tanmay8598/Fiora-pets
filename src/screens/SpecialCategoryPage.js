import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Title from "./../components/Title";
import SubCategories from "../components/SubCategories";
import { useLocation } from "react-router-dom";

import Footer from "./../components/Footer";
import SpecialProducts from "./Products/SpecialProducts";
// import SubProducts from "./Products/SubProducts";

const SpecialCategoryPage = ({ item }) => {
  const { state } = useLocation();
  const categoryId = state._id;
  // console.log(state);
  return (
    <>
      <Navbar />
      <Container>
        <Title title={state.name} />
        {/* <SubCategories data={categoryId} title="specialcategory" /> */}
        <SpecialProducts data={categoryId} />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 150px;
`;

export default SpecialCategoryPage;
