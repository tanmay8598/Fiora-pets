import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height: 36vh;
  margin: 5px 20px;
  position: relative;
  min-width: 180px;
  border: 1px solid black;
  border-radius: 30px;
  ${mobile({
    margin: "0 10px",
    height: "23vh",
    minWidth: "140px",
    display: "inline-block",
    verticalAlign: "middle",
  })}

  &:hover {
    box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
    transition: 0.4s;
    transform: translateY(-1vmax);
  }
`;
const Image = styled.img`
  width: 100%;
  height: 72%;
  object-fit: cover;
  border-radius: 15%;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  ${mobile({ height: "91%", width: "100%", borderRadius: "21%", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"  })}
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 10vh;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcf5f5;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  ${mobile({ height: "4vh"})}
`;
const Title = styled.h2`
  color: black;
  margin-bottom: 10px;
  ${mobile({ fontSize: "20px", marginBottom: "1px" })}
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 10px;
  transition: 0.5s;
  box-shadow: 0 0 20px #eee;
  background-color: teal;
  &:hover {
    background-image: linear-gradient(to right, #93d758 0%, #289252 100%);
  }
`;

const CategoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/category", { state: item })}>
      <Image src={item.photo} />
      <Info>
        <Title>{item.name}</Title>
        {/* <Button onClick={() => navigate("/category", { state: item })}>
          Shop Now
        </Button> */}
      </Info>
    </Container>
  );
};

export default CategoryItem;
