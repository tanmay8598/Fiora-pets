import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import apiClient from "../../../api/client";
import ProductCard from "../ProductCard";
import "../Products.css";
import Footer from "../../../components/Footer";
import BarLoader from "react-spinners/BarLoader";

const AllSaleProducts = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    const { data } = await apiClient.get("/products/sale-products", {
      pageNumber: currentPage,
    });
    setProducts(data?.products);
    setPageSize(data?.pageCount);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: "130px" }}>
      <h1 className="productsHeading">Sale Products</h1>
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
        <div className="container">
          <div className="products">
            {products?.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <h2>No Products Found</h2>
            )}
          </div>
        </div>
      )}

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

export default AllSaleProducts;
