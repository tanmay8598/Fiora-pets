import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const SubCategoryItem = ({ item, title }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "subcategory") {
      navigate(`/subcategory/${item._id}`, { state: item });
    } else if (title === "specialcategory") {
      navigate(`/specialcategory/${item._id}`, { state: item });
    }
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
  height: 170px;
  min-width: 220px;
  /* width: 80%; */

  margin: 3px;
  align-items: center;
  justify-content: center;

  ${mobile({
    margin: "0 10px",
    height: "24vh",
    minWidth: "140px",
    // display: "inline-block",
    verticalAlign: "middle",
    display: "flex",
    justifyContent: "center",
  })};
  cursor: pointer;
  &:hover {
    /* text-decoration: underline; */
    box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
    transform: translateY(-1vmax);
    font-style: italic;
    font-weight: 700;
  }
`;
const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 50%;
  ${mobile({ height: "115px", width: "115px", objectFit: "contain" })}
`;
const Info = styled.div`
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: #0e0606;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  white-space: pre-line;
  ${mobile({ fontSize: "15px" })}
`;

export default SubCategoryItem;
