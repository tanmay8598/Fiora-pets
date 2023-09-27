import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import apiClient from "../../../api/client";
import ProductCard from "../ProductCard";
import "../Products.css";
import Footer from "./../../../components/Footer";
import Lottie from "react-lottie";
import animationData from "../../../lottie/cart.json";
const AllBest = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState();
  const [pageSize, setPageSize] = useState();

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    const { data } = await apiClient.get("/products/bestproducts", {
      pageNumber: currentPage,
    });
    setProducts(data?.products);
    setPageSize(data?.pageCount);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ marginTop: "130px" }}>
      <h1 className="productsHeading">Best Sellers✨</h1>
      <div className="container">
        <div className="products">
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
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
      <Footer />
    </div>
  );
};

export default AllBest;
