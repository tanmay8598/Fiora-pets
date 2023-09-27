import React, { useEffect } from "react";
import Slider from "../components/Slider";
import Categories from "./../components/Categories";

import Title from "../components/Title";

import Footer from "../components/Footer";
import HomeProducts from "./Products/HomeProducts";

import BestSellers from "./Products/Best/BestSellers";
import SaleProducts from "./Products/Sale/SaleProducts";
import AquaProducts from "./Products/Aquarium/AquaProducts";
import PetFavourite from "./../components/PetFavourite";
import PopularCategories from "./../components/PopularCategories";
import Brand from "./../components/Brand";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <br />
      <br />
      <Title title="Shop By Pet✨" />
      <Categories />
      <br />
      <Title title="Discover Pet Favourite by Fiora" />
      <PetFavourite />
      <br />
      <Title title="Popular Categories" />
      <PopularCategories />
      <br />
      <Title title="Shop by Brand" />
      <Brand />
      <br />
      <Title title="Best Sellers✨" />
      <BestSellers />

      <Title title="Sale Sale💯🎁" />
      <SaleProducts />
      <Title title="Aquariums🐟" />
      <AquaProducts />
      <HomeProducts />

      <Footer />
    </div>
  );
};

export default HomePage;
