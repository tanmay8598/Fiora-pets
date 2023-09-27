import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const BrandItem = ({ item, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/brand/${item._id}`, { state: item });
  };

  
  return (
    <Container onClick={handleClick}>
      <Image src={item.photo} />
      <Info>
        <Title>{item.name}</Title>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  min-width: 160px;
  /* width: 80%; */
  margin: 10px;
  align-items: center;
  justify-content: center;

  ${mobile({
    margin: "0 10px",
    height: "24vh",
    minWidth: "140px",
    display: "inline-block",
    verticalAlign: "middle",
  })};
  cursor: pointer;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
    border-radius: 10px;
    transform: translateY(-1vmax);
    font-style: italic;
    font-weight: 700;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  ${mobile({ height: "18vh", objectFit: "contain" })}
`;
const Info = styled.div`
  /* width: 100%;
  height: 100%;
  top: 0;
  left: 0; */
  /* display: flex; */
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: #0e0606;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  &:hover {
    /* text-decoration: underline; */
    /* color: orange;
    font-style: italic; */
  }
`;

export default BrandItem;
