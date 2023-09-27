import { Slider, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import apiClient from "../../api/client";
import MetaData from "../../components/MetaData";
import "./Products.css";
import ProductCard from "./ProductCard";
import Modal from "react-modal";
import { Pagination } from "@mui/material";
import Lottie from "react-lottie";
import animationData1 from "../../lottie/cart.json";
import { useMediaQuery } from "react-responsive";
import CloseIcon from "@mui/icons-material/Close";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

const SpecialProducts = (props) => {
  const categoryId = props.data;

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();
  const [ratings, setRatings] = useState(0);
  const [categories, setCategories] = useState();
  const [colors, setColors] = useState();
  const [color, setColor] = useState();
  const [brands, setBrands] = useState();
  const [brand, setBrand] = useState();
  const [sizes, setSizes] = useState();
  const [size, setSize] = useState();
  const [pageSize, setPageSize] = useState();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const priceCallback = (event, newPrice) => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, categoryId, size, color, brand]);

  useEffect(() => {
    allSpecialBySubCategories();
    fetchColors();
    fetchBrands();
    fetchSizes();
  }, []);

  const fetchProducts = async () => {
    // const { data } = await apiClient.get(
    //   "/products//get-productby-special-category",
    //   {
    //     SpecialCatId: categoryId,
    //     pageNumber: currentPage,
    //     price: price,
    //   }
    // );

    const { data } = await apiClient.get("/products", {
      specialcategory: categoryId,
      pageNumber: currentPage,
      size: size?._id,
      color: color?._id,
      brand: brand?._id,
      price: price,
    });

    setProducts(data?.products);
    setPageSize(data?.pageCount);
  };

  const allSpecialBySubCategories = async () => {
    const { data } = await apiClient.get("/variations/get-special-bysub", {
      catId: categoryId,
    });

    setCategories(data);
  };

  const fetchColors = async () => {
    const { data } = await apiClient.get("/variations/getcolor");

    setColors(data);
  };
  const fetchBrands = async () => {
    const { data } = await apiClient.get("/variations/getbrand");

    setBrands(data);
  };
  const fetchSizes = async () => {
    const { data } = await apiClient.get("/variations/getsize");

    setSizes(data);
  };

  const mobileScreen = useMediaQuery({ query: `(max-width: 600px)` });
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const dataForDisplay = expanded ? brands : brands?.slice(0, 4);

  return (
    <Fragment>
      <Fragment>
        <MetaData title="PRODUCTS -- ECOMMERCE" />

        {/* <h2 className="productsHeading">Products</h2> */}
        <div className="container" id="specialproducts">
          <Modal
            isOpen={modal}
            onRequestClose={() => setModal(false)}
            style={customStyles}
          >
            <div className="modalHeading">
              <Typography style={{ fontWeight: "700" }}>Filter By</Typography>
              <CloseIcon onClick={() => setModal(false)} />
            </div>
            <div className="filterBox">
              <Typography style={{ fontWeight: "600" }}>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                onChangeCommitted={priceCallback}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={2500}
              />

              <Typography style={{ fontWeight: "600" }}>Sizes</Typography>
              <ul className="categoryBox">
                {sizes?.map((item) => {
                  if (size?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setSize(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setSize(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
              </ul>
              <Typography style={{ fontWeight: "600" }}>Colors</Typography>
              <ul className="categoryBox">
                {colors?.map((item) => {
                  if (color?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setColor(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setColor(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
              </ul>
              <Typography style={{ fontWeight: "600" }}>Brands</Typography>
              <ul className="categoryBox">
                {dataForDisplay?.map((item) => {
                  if (brand?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setBrand(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setBrand(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
                <button type="button" onClick={() => setExpanded(!expanded)}>
                  {expanded ? "Show Less" : "Show More"}
                </button>
              </ul>
            </div>
          </Modal>
          {!mobileScreen && (
            <div className="filterBox">
              <Typography style={{ fontWeight: "600" }}>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                onChangeCommitted={priceCallback}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={2500}
              />

              <Typography style={{ fontWeight: "600" }}>Sizes</Typography>
              <ul className="categoryBox">
                {sizes?.map((item) => {
                  if (size?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setSize(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setSize(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
              </ul>
              <Typography style={{ fontWeight: "600" }}>Colors</Typography>
              <ul className="categoryBox">
                {colors?.map((item) => {
                  if (color?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setColor(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setColor(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
              </ul>
              <Typography style={{ fontWeight: "600" }}>Brands</Typography>
              <ul className="categoryBox">
                {dataForDisplay?.map((item) => {
                  if (brand?._id === item._id) {
                    return (
                      <li
                        className="category-link-high"
                        key={item._id}
                        onClick={() => setBrand(item)}
                      >
                        {item.name}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        className="category-link"
                        key={item._id}
                        onClick={() => setBrand(item)}
                      >
                        {item.name}
                      </li>
                    );
                  }
                })}
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  style={{ border: "none", fontSize: "14px" }}
                >
                  {expanded ? "Show Less" : "Show More"}
                </button>
              </ul>
            </div>
          )}
          <div className="products">
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div style={{ marginTop: "170px" }}>
                <Lottie options={defaultOptions2} height={200} width={200} />
                <h3>Loading...</h3>
              </div>
            )}
          </div>
        </div>
        <div className="paginationBox">
          <Pagination
            count={pageSize}
            page={currentPage}
            siblingCount={1}
            onChange={(e, value) => {setCurrentPage(value)
              const element = document.getElementById("specialproducts");
               element.scrollIntoView();
              }}
          />
        </div>
      </Fragment>
    </Fragment>
  );
};

export default SpecialProducts;
