import "./PopularCategories.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import SubCategoryItem from "./SubCategoryItem";
import apiClient from "./../api/client";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  scroll-behavior: smooth;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "row",
    margin: "10px",
    width: "100%",
    overflowX: "scroll",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    scrollBarWidth: "none",
    paddingTop: "20px",
  })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PopularCategories = () => {
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  const [scrollX2, setscrollX2] = useState(0); // For detecting start scroll postion
  const [scrolEnd2, setscrolEnd2] = useState(false); // For detecting end of scrolling

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await apiClient.get(
      "/variations/get-active-sub-categories"
    );
    const middleIndex = Math.ceil(data?.length / 2);
    const firstHalf = data?.splice(0, middleIndex);
    const secondHalf = data?.splice(-middleIndex);
    setData1(firstHalf);
    setData2(secondHalf);
  };

  const scrl = useRef(0);
  const scrl2 = useRef(0);

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    scrl2.current.scrollLeft += shift;
    setscrollX(scrollX + shift); // Updates the latest scrolled postion
    setscrollX2(scrollX + shift);
    //For checking if the scroll has ended
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
      setscrolEnd2(true);
    } else {
      setscrolEnd(false);
      setscrolEnd2(false);
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

  const scrollCheck2 = () => {
    setscrollX2(scrl2.current.scrollLeft);
    if (
      Math.floor(scrl2.current.scrollWidth - scrl2.current.scrollLeft) <=
      scrl2.current.offsetWidth
    ) {
      setscrolEnd2(true);
    } else {
      setscrolEnd2(false);
    }
  };

  return (
    <>
      <div className="slider-container">
        <div class="slider1">
          <Container ref={scrl} onScroll={scrollCheck}>
            {data1?.map((item) => (
              <SubCategoryItem
                item={item}
                key={item.id}
                title={"subcategory"}
              />
            ))}
          </Container>
        </div>
        <div className="button-container">
          {
            <button className="prev" onClick={() => slide(-520)}>
              <i className="fa fa-angle-left"></i>
            </button>
          }
          {
            <button className="next" onClick={() => slide(+520)}>
              <i className="fa fa-angle-right"></i>
            </button>
          }
        </div>
        <div class="slider1">
          <Container ref={scrl2} onScroll={scrollCheck2}>
            {data2?.map((item) => (
              <SubCategoryItem
                item={item}
                key={item.id}
                title={"subcategory"}
              />
            ))}
          </Container>
        </div>
      </div>
    </>
  );
};

export default PopularCategories;
