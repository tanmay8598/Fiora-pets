import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import logo1 from "../assets/group-portrait-adorable-puppies.jpg";
import { mobile } from "../responsive";
import Title from "./../components/Title";
import SubCategories from "../components/SubCategories";
import { useLocation } from "react-router-dom";
// import Products from "../components/Products";
import Products from "./Products/Products";
import Footer from "./../components/Footer";

const CategoryPage = ({ item }) => {
  //item should contain category info like category name etc
  const { state } = useLocation();
  const categoryId = state._id;

  const bannerLink = state?.banner;

  return (
    <>
      <Container>
        <BannerWrapper>
          <Title title={state?.name} />
          <Banner src={bannerLink} />
        </BannerWrapper>
        <Title title="Sub Categories" />
        {/* get sub categories by categories */}
        <SubCategories data={categoryId} title="subcategory" />
        <Title title="Special Categories" />
        {/* get special categories by categories */}
        <SubCategories data={categoryId} title="specialcategory" />

        {/* Products list with filters */}

        <Products data={categoryId} />
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  margin-top: 150px;
`;

const Heading1 = styled.h1`
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  position: absolute;
  top: 0;
  ${mobile({ fontSize: "24px", textAlign: "center" })}
`;

const Banner = styled.img`
  height: 60vh;
  width: 90vw;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  border-radius: 7px;
  ${mobile({ height: "20vh", objectFit: "contain" })}
`;

const BannerWrapper = styled.div`
  position: relative;
`;

export default CategoryPage;
