import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "./../../../responsive";
import apiClient from "./../../../api/client";
import { MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../../../redux/cartSlice";
import logo from "../../../assets/custommaqua.jpg";
import logo2 from "../../../assets/custom2.jpg";
import "./MyCustomProductPage.css";

const MyCustomProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultTank, setDefault] = useState();
  const [tanks, setTanks] = useState();
  const [area, setArea] = useState("");
  const [price, setPrice] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await apiClient.get("/aquarium/get-custom-product", {
      length,
      width,
      depth,
    });
    if (result.ok) {
      setDefault(result.data.tanksize);
      setTanks(result.data.tanksAllowed);
      const a1 = 2 * length * depth + length * width + 2 * width * depth;
      setArea(a1);
      const p1 = area * defaultTank?.per_unit_price;
      setPrice(p1);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const p1 = area * defaultTank?.per_unit_price;
    setPrice(p1);
  }, [defaultTank]);

  const handleCart = () => {
    dispatch(
      add({
        product: {
          sell_price: price,
          dimensions: {
            length: length,
            width: width,
            depth: depth,
          },
          ...defaultTank,
        },
        quantity: "1",
        productImages: [
          {
            img: "https://m.media-amazon.com/images/I/91YWJ31n0TL._AC_SL1500_.jpg",
          },
        ],
      })
    );
    navigate("/cart");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Fill Tank Size Requirement</Title>
        <Form>
          <label>Tank Length</label>
          <Input
            placeholder="Tank Length in cm"
            name="length"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Tank Width</label>
          <Input
            placeholder="Tank Width in cm"
            name="width"
            onChange={(e) => setWidth(e.target.value)}
          />
          <label>Tank Depth</label>
          <Input
            placeholder="Tank Depth in cm"
            name="depth"
            onChange={(e) => setDepth(e.target.value)}
          />
          <Button onClick={handleSubmit}>Check</Button>
        </Form>
      </Wrapper>

      {area > 0 && price > 0 && defaultTank ? (
        <Wrapper2>
          {area > 0 && price > 0 && defaultTank && (
            <>
              <Title>Selected Tank Measurements</Title>

              <p>Area: {area} cm²</p>
              <p>Volume: {length * width * depth} cm³</p>
              <p>Thickness: {defaultTank?.thickness} mm</p>
              <p>Per unit price: QAR {defaultTank?.per_unit_price} </p>
              <h5>Price: QAR {price} /-</h5>
            </>
          )}
          {tanks?.length > 0 && (
            <>
              <label>More Tanks *</label>
              <Select
                className="form-control"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultTank}
                label="tank"
                onChange={(e) => setDefault(e.target.value)}
              >
                {tanks?.map((item, index) => {
                  return (
                    <MenuItem value={item}>
                      {" "}
                      Thickness {item.thickness} cm
                    </MenuItem>
                  );
                })}
              </Select>
            </>
          )}
          <br />

          {defaultTank && (
            <Button onClick={handleCart} style={{ marginTop: "20px" }}>
              Add To Cart
            </Button>
          )}
        </Wrapper2>
      ) : (
        <Wrapper3>
          <AquaImg1 src={logo} alt="aquarium-img1" />
          <AquaImg2 src={logo2} alt="aquarium-img2" />
        </Wrapper3>
      )}
    </Container>
  );
};

const AquaImg1 = styled.img`
  width: 45%;
  object-fit: "cover";
  animation: leftright 0.5s;

  @keyframes leftright {
    from {
      opacity: 0;
      transform: translateY(-500px);
      transition: all 500ms ease-in-out;
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;
const AquaImg2 = styled.img`
  width: 50%;
  object-fit: "cover";
  animation: leftright2 0.5s;

  @keyframes leftright2 {
    from {
      opacity: 0;
      transform: translateX(500px);
      transition: all 500ms ease-in-out;
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  /* ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })} */
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 130px;
  padding: 20px 50px;

  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
  })}
`;

const Title = styled.h1`
  font-size: 21px;
  font-weight: 500;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Wrapper2 = styled.div`
  border: 1px solid black;
  padding: 20px;
  background-color: white;
  width: 60%;
  ${mobile({ width: "105%" })}
`;
const Wrapper3 = styled.div`
  border: 1px solid black;
  padding: 20px;
  background-color: white;
  width: 60%;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%", height: "150px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  /* ${mobile({ width: "105%" })} */
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 15px;

  ${mobile({
    width: "100%",
  })}
`;

export default MyCustomProductPage;
