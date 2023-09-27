import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import "./Slider.css";
import apiClient from "./../api/client";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState();
  const [index, setIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems?.length - 1);
    } else {
      setSlideIndex(slideIndex < sliderItems?.length ? slideIndex + 1 : 0);
    }
  };

  const caraousel = () => {
    if (index === sliderItems?.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    setTimeout(() => caraousel(), 3000);

    return () => {};
  }, [index]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data } = await apiClient.get("/variations/imgs-banner");
    setSliderItems(data);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems?.map((item) => (
          <Slide
            bg={item.bg}
            key={item._id}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              {/* <Button>SHOW NOW</Button> */}
            </InfoContainer>
          </Slide>
        ))}
        
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ marginTop: "120px" })}
  margin: auto;
  margin-top: 130px;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 40vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  transition: ease 2000ms;
`;

const ImgContainer = styled.div`
  height: 100%;
  
  ${mobile({ display: "contain", opacity: "0.3", width:"1%", flex: "none" })} 
  flex: 1;
  `;

const Image = styled.img`
  height: 100%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ height: "80%", width: "99%", opacity: "99", padding: "20px"})}
  `;

const Title = styled.h1`
  font-size: 40px;
  ${mobile({ fontSize: "35px"})}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  ${mobile({ fontSize: "16px"})}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
  background-color: transparent;
  cursor: pointer;
`;
export default Slider;
