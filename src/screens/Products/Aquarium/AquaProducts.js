import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import apiClient from "./../../../api/client";
import BestSellerCard from "../Card/BestSellerCard";
import { mobile } from "../../../responsive";
import { useNavigate } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import "./AquaProducts.css";

const AquaProducts = () => {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const scrl = useRef(0);
  useEffect(() => {
    saleProducts();
  }, []);

  const saleProducts = async () => {
    setLoading(true);
    const { data } = await apiClient.get("/aquarium/get-aquarium-product");
    setProducts(data?.products);
    setLoading(false);
  };

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift); // Updates the latest scrolled postion

    //For checking if the scroll has ended
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
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
        <>
          {products?.length > 0 && (
            <>
              <Button onClick={() => navigate("/aquariumlist")}>
                VIEW ALL
              </Button>
              <div className="slider">
                {scrollX !== 0 && (
                  <button className="prev" onClick={() => slide(-180)}>
                    <i className="fa fa-angle-left"></i>
                  </button>
                )}
                <Container ref={scrl} onScroll={scrollCheck}>
                  {products?.map((product) => (
                    <BestSellerCard key={product._id} product={product} />
                  ))}
                </Container>{" "}
                {!scrolEnd && (
                  <button className="next" onClick={() => slide(+180)}>
                    <i className="fa fa-angle-right"></i>
                  </button>
                )}
              </div>
            </>
          )}
          {products?.length <= 0 && (
            <h4 style={{ textAlign: "center" }}>No products found</h4>
          )}
        </>
      )}
    </div>
  );
};

const Button = styled.button`
  position: absolute;
  right: 0;
  top: -20px;
  color: black;
  font-weight: 400;
  text-decoration: underline;
  border: none;
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
  ${mobile({
    left: "0",
  })}
`;

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  justify-content: space-between;
  position: relative;
  ${mobile({
    padding: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "0 20px",
    width: "100%",
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    scrollBarWidth: "none",
  })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default AquaProducts;
