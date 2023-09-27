import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Heading = styled.h1`
  font-size: 30px;
  padding-left: 80px;
  font-weight: 600;
  margin-top: 10px;
  ${mobile({ fontSize: "30px", padding: "20px", textAlign: "center" })}
`;

const Title = ({ title }) => {
  return <Heading>{title}</Heading>;
};

export default Title;
