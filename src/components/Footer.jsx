import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import useAuth from "../auth/useAuth";

import { useEffect, useState } from "react";
import apiClient from "../api/client";

const Footer = () => {
  const [data, setData] = useState();
  const { user } = useAuth();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const { data } = await apiClient.get("/variations/gettextbanners");
    setData(data);
  };

  return (
    <>
      <BannerContainer>
        {data?.map((item) => {
          return (
            <Banner>
              <p style={{ width: "90%" }}>{item.textDescription}</p>
            </Banner>
          );
        })}
      </BannerContainer>
      <Container>
        <Left>
          <Logo>Fiora Pets</Logo>
          <Desc>
            As pet parents, we realize that information on the lifestyle,
            nutritional and behavioral needs of pets is all across the internet
            but probably paucity of time is an impediment for pet parents to
            know what really works best for their pets. So we simply decided: If
            it’s not good, it’s not on Fiora.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
          <Desc>
            Developed by{" "}
            <a href="https://www.mmhtechnologies.com">MMH TECHNOLOGIES</a>
          </Desc>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </a>
            </ListItem>
            <ListItem>
              <a
                href="/aquarium"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Custom Aquariums
              </a>
            </ListItem>
            <ListItem>
              {user ? (
                <a
                  href="/profile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Account
                </a>
              ) : (
                <a
                  href="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  My Account
                </a>
              )}
            </ListItem>
            <ListItem>
              {user ? (
                <a
                  href="/myorders"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Delivery Tracking
                </a>
              ) : (
                <a
                  href="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Delivery Tracking
                </a>
              )}
            </ListItem>

            <ListItem>
              <a
                href="/termsandconditions"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Terms & Conditions
              </a>
            </ListItem>
            <ListItem>
              <a
                href="/aboutus"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About Us
              </a>
            </ListItem>
            <ListItem>
              <a
                href="/privacypolicy"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Privacy Policy
              </a>
            </ListItem>
            <ListItem>
              <a
                href="/contactus"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact Us
              </a>
            </ListItem>
            <ListItem>
              <a
                href="/returnpolicy"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Return Policy
              </a>
            </ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} /> Doha, Qatar
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} /> +974-30014946
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} /> info@fiora.qa
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    </>
  );
};

const BannerContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;
const Banner = styled.div`
  background-color: #0039a6;
  color: white;
  padding: 20px;
  border-radius: 5px;
  width: 20vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%", marginBottom: "18px", padding: "10px" })};
`;
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

export default Footer;
