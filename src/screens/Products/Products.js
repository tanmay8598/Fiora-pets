import { Slider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/client";
import { useMediaQuery } from "react-responsive";
import "./Products.css";
import ProductCard from "./ProductCard";
import { Pagination } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import Lottie from "react-lottie";
import animationData2 from "../../lottie/emptyBox.json";
import animationData from "../../lottie/cart.json";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};
const Products = (props) => {
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const categoryId = props.data;

  const [modal, setModal] = useState(false);

  const mobileScreen = useMediaQuery({ query: `(max-width: 600px)` });
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 2500]);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [colors, setColors] = useState();
  const [color, setColor] = useState();
  const [brands, setBrands] = useState();
  const [brand, setBrand] = useState();
  const [sizes, setSizes] = useState();
  const [size, setSize] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [pageSize, setPageSize] = useState();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const priceCallback = (event, newPrice) => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [category, currentPage, size, color, brand]);

  useEffect(() => {
    fetchAllSubByCategories();
    fetchColors();
    fetchBrands();
    fetchSizes();
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchProducts = async () => {
    setUploadVisible(true);
    const { data } = await apiClient.get("/products", {
      category: categoryId,
      subcategory: category?._id,
      pageNumber: currentPage,
      size: size?._id,
      color: color?._id,
      brand: brand?._id,
      price: price,
    });

    setProducts(data?.products);
    setPageSize(data?.pageCount);
    setTimeout(() => setUploadVisible(false), 1500);
  };

  const fetchAllSubByCategories = async () => {
    const { data } = await apiClient.get("/variations/get-sub-bycat", {
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

  const [expanded, setExpanded] = useState(false);
  const dataForDisplay = expanded ? brands : brands?.slice(0, 4);

  return (
    <>
      {uploadVisible ? (
        <div
          style={{
            width: "100%",
            margin: "0 auto",
            marginBottom: "400px",
            marginTop: "200px",
          }}
        >
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      ) : (
        <div>
          <h1 className="productsHeading">
            Products
            {mobileScreen && (
              <Typography
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                  fontSize: "20px",
                  backgroundColor: "#fcf5f5",
                  marginTop: "20px",
                  width: " 60%",
                  borderRadius: "20px",
                  margin: "50px auto",
                }}
                onClick={() => setModal(true)}
              >
                <FilterListIcon /> Filters
              </Typography>
            )}
          </h1>
          <div className="container">
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

                <Typography style={{ fontWeight: "600" }}>
                  Categories
                </Typography>
                <ul className="categoryBox">
                  {categories?.map((item) => {
                    if (category?._id === item._id) {
                      return (
                        <li
                          className="category-link-high"
                          key={item._id}
                          onClick={() => setCategory(item)}
                        >
                          {item.name}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          className="category-link"
                          key={item._id}
                          onClick={() => setCategory(item)}
                        >
                          {item.name}
                        </li>
                      );
                    }
                  })}
                </ul>

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
                  <h3>Oops! no products found</h3>
                </div>
              )}
            </div>
          </div>
          <div className="paginationBox">
            <Pagination
              count={pageSize}
              page={currentPage}
              siblingCount={1}
              onChange={(e, value) => setCurrentPage(value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
