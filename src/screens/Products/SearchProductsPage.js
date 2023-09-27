import React, { Fragment, useEffect, useState } from "react";
import apiClient from "../../api/client";
import MetaData from "../../components/MetaData";
import "./Products.css";
import ProductCard from "./ProductCard";
import { Pagination } from "@mui/material";
import { useLocation } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

const SearchProductsPage = (props) => {
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);

  const totalPages = products?.length / pageSize;
  const lastIndex = pageSize * currentPage;
  const firstIndex = lastIndex - pageSize;

  useEffect(() => {
    setProducts([]);
    fetchProducts();
  }, [currentPage, location?.state?.search]);

  const fetchProducts = async () => {
    const { data } = await apiClient.get("/products/search", {
      Query: location.state.search,
      pageNumber: currentPage,
    });
    setProducts(data);
    setProducts2(data.slice(firstIndex, lastIndex));
    setPageSize(10);
    setLoading(false);
  };

  return (
    <Fragment>
      <Fragment>
        <MetaData title="PRODUCTS -- ECOMMERCE" />
        <h1 style={{ marginTop: "170px", textAlign: "center" }}>
          Your Search for "{location.state.search}"
        </h1>

        <div className="container" id="searchproducts">
          {loading ? (
            <div
              style={{
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <p>Loading</p>
              <BarLoader
                color="#36d7b7"
                height={8}
                width={250}
                speedMultiplier={0.7}
              />
            </div>
          ) : (
            <div className="products">
              {products2?.length > 0 ? (
                products2?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <h2>No Products Found</h2>
              )}
            </div>
          )}
        </div>
        <div className="paginationBox">
          <Pagination
            count={totalPages}
            page={currentPage}
            siblingCount={1}
            onChange={(e, value) => {
              setCurrentPage(value);
              const element = document.getElementById("searchproducts");
              element.scrollIntoView();
            }}
          />
        </div>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default SearchProductsPage;
