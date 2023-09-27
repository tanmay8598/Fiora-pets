import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import apiClient from "./../api/client";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 20px;
  justify-content: space-between;
  ${mobile({
    padding: "0px",
    flexDirection: "row",
    // margin: "20px",
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

const Categories = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await apiClient.get("/variations/get-categories");

    let sortedData = data?.sort((p1, p2) =>
      p1._id > p2._id ? 1 : p1._id < p2._id ? -1 : 0
    );
    const x = sortedData[5];
    for (let i = 5; i >= 4; i--) {
      sortedData[i] = sortedData[i - 1];
    }
    sortedData[3] = x;

    setData(data);
  };
  // console.log(data);
  return (
    <Container>
      {data?.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
