import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import "./Slider.css";
import apiClient from "./../api/client";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const VideoBanner = () => {
  const [videos, setVideos] = useState();
  const [slideIndex, setSlideIndex] = useState(0);
  const [index, setIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : videos?.length);
    } else {
      setSlideIndex(slideIndex < videos?.length ? slideIndex + 1 : 0);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await apiClient.get("/variations/videos-banner");
    setVideos(data);
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {videos?.map((item) => (
          <Slide
            bg={item.bg}
            key={item.id}
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            className="video-bg"
          >
            <video className="videoTag" autoPlay loop muted controls>
              <source src={item?.videoLink} type="video/mp4" />
            </video>
          </Slide>
        ))}
        >
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin: auto;
  margin-top: 130px;
  margin-bottom: 20px;
  ${mobile({ display: "none" })}
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
  /* height: 40vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #${(props) => props.bg};
  transition: ease 2000ms;
`;

export default VideoBanner;
