import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import bgImg from "./bg.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AquariumPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Wrapper>
          <Info>
            <h3 style={{ color: "#0039a6" }}>Custom Aquariums</h3>
            <h1 style={{ fontSize: "40px", color: "#0039a6" }}>
              You dream it We build it
            </h1>
            <p
              style={{ fontSize: "18px", marginTop: "30px", color: "#0039a6" }}
            >
              Order your custom built aquarium from our world renowned engineers
              and craftsmen.
            </p>
          </Info>
          <Button onClick={() => navigate("/custom-product")}>
            Design Your Aquarium
          </Button>
          <Button2 onClick={() => navigate("/aquariumlist")}>
            Shop Special
          </Button2>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

const Button = styled.button`
  background-color: white;
  color: #0039a6;
  font-weight: 700;
  padding: 5px 5px;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  margin-top: 40px;
  width: 18vw;
  text-align: left;

  ${mobile({ width: "80%" })}

  &:hover {
    opacity: 0.9;
  }
`;
const Button2 = styled.button`
  background-color: white;
  color: #0039a6;
  font-weight: 700;
  padding: 5px 5px;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  margin-top: 20px;
  width: 13vw;
  text-align: left;

  ${mobile({ width: "50%", marginTop: "20px" })}
  &:hover {
    opacity: 0.9;
  }
`;

const Container = styled.div`
  margin-top: 130px;
  display: flex;
  background-repeat: no-repeat;
  height: 100vh;
  background-image: url(${bgImg});
  margin-bottom: 50px;
  background-size: cover;
  ${mobile({ backgroundSize: "initial" })};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 100px;
  margin-top: 200px;
  height: 50vh;
  color: white;
  ${mobile({ width: "80%", margin: "auto", marginTop: "80px" })}
`;

const Info = styled.div``;

export default AquariumPage;
