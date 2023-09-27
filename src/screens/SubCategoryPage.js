import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Title from "./../components/Title";
import SubCategories from "../components/SubCategories";
import { useLocation } from "react-router-dom";

import Footer from "./../components/Footer";
import SubProducts from "./Products/SubProducts";

const SubCategoryPage = ({ item }) => {
  const { state } = useLocation();
  const categoryId = state._id;

  return (
    <>
      <Navbar />
      <Container>
        <Title title={state.description} />
        <SubCategories data={categoryId} title="specialcategory" />
        <SubProducts data={categoryId} />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 150px;
`;

export default SubCategoryPage;
