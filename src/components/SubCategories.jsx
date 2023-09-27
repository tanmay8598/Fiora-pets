import React, { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { dogsItemsCategory1 } from "../data";
import { mobile } from "../responsive";
import SubCategoryItem from "./SubCategoryItem";
import apiClient from "./../api/client";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  padding: 20px;
  width: 90vw;
  margin: auto;
  overflow-x: auto;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "row",
    margin: "0 20px",
    width: "100%",
    overflowX: "scroll",
    overflowY: "hidden",
    scrollBarWidth: "none",
  })}

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubCategories = (props) => {
  const categoryId = props.data;

  const title = props.title;
  const [data, setData] = useState();
  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling
  useEffect(() => {
    if (props.title === "subcategory") {
      fetchSubCategories();
    } else if (props.title === "specialcategory") {
      fetchSpecialCategories();
    }
  }, [categoryId]);

  const fetchSubCategories = async () => {
    const { data } = await apiClient.get("/variations/get-sub-bycat", {
      catId: categoryId,
    });

    setData(data);
  };
  const fetchSpecialCategories = async () => {
    const { data } = await apiClient.get("/variations/get-special-bycat", {
      catId: categoryId,
    });

    setData(data);
  };

  const scrl = useRef(0);

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
    <div class="slider1">
      {scrollX !== 0 && (
        <button className="prev" onClick={() => slide(-520)}>
          <i className="fa fa-angle-left"></i>
        </button>
      )}
      <Container key={categoryId} ref={scrl} onScroll={scrollCheck}>
        {data?.map((item) => (
          <SubCategoryItem item={item} key={item.id} title={title} />
        ))}
      </Container>
      {!scrolEnd && (
        <button className="next" onClick={() => slide(+520)}>
          <i className="fa fa-angle-right"></i>
        </button>
      )}
    </div>
  );
};

export default SubCategories;
