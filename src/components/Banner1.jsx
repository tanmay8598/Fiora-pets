import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 60%;
  height: 30px;
  background-color: #52abe7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin: auto;
  border-radius: 5px;
  margin-top: 20px;
  ${mobile({ marginTop: "50px", width: "90%" })}
`;

const Banner1 = () => {
  return <Container>Super Saver Deal 10% OFF</Container>;
};

export default Banner1;
