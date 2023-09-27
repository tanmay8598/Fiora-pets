import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { mobile } from "../../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import MetaData from "../../components/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import apiClient from "./../../api/client";
import useAuth from "../../auth/useAuth";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ConfirmOrder = () => {
  const location = useLocation();

  const items = useSelector((state) => state.cart.cart);

  const { user } = useAuth();
  const [data, setData] = useState();
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    fetchMyReward();
  }, []);

  const fetchMyReward = async () => {
    if (user) {
      const { data } = await apiClient.get("/rewards/getrewardpoints", {
        userId: user?.id,
      });
      setData(data);
    }
  };

  const navigate = useNavigate();
  const shippingAddress = location.state.shippingAddress;
  const slot = location.state.slot;

  const orderItems = [];
  var subTotal = 0;
  const city = shippingAddress.city.toLowerCase();
  var shippingPrice = 0;

  const total1 = Number(
    items
      .reduce((acc, item) => acc + item.quantity * (item.product.sell_price -
        (item.product.discount / 100) * item.product.sell_price), 0)
      .toFixed(2)
  );

  if (city === "doha") {
    if (total1 >= 99) {
      shippingPrice = 0;
    } else {
      shippingPrice = 10;
    }
  } else {
    if (total1 >= 149) {
      shippingPrice = 0;
    } else {
      shippingPrice = 20;
    }
  }

  const subtotal = checked ? total1 - data?.amount / 10 : total1;

  const total = (subtotal + shippingPrice).toFixed(2);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCheckout = () => {
    if (orderItems.length > 0 && subTotal > 0) {
      navigate("/payment", {
        state: { shippingAddress, orderItems, subTotal: total, slot },
      });
    }
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <Container>
        <CheckoutSteps activeStep={1} />
        <Wrapper>
          <Title>Order Confirm</Title>
          <Top>
            <TopTexts>
              <h4>Ship To</h4>
              <TopText>
                Address: {shippingAddress.address}, {shippingAddress.zone} ,
                {shippingAddress.city} ,{shippingAddress.region} ,
                {shippingAddress.country}
              </TopText>
              <TopText>
                Contact Info: {shippingAddress.email},{" "}
                {shippingAddress.mobileNumber},
              </TopText>
            </TopTexts>
          </Top>
          <Bottom>
            <Info>
              {items.map((item) => {
                //custom product
                if (item?.product?.dimensions) {
                  orderItems.push({
                    name: item.product.name,
                    qty: item.quantity,
                    image: item.productImages[0].img,
                    price: (item.product?.sell_price -
                      (item.product?.discount / 100) * item.product?.sell_price),
                    customaquarium: {
                      tank: item.product._id,
                      length: item.product?.dimensions?.length,
                      width: item.product?.dimensions?.width,
                      depth: item.product?.dimensions?.depth,
                    },
                  });
                }
                //aquarium product
                else if (item?.product?.depth) {
                  orderItems.push({
                    name: item.product.name,
                    qty: item.quantity,
                    image: item.productImages[0].img,
                    price: (item.product?.sell_price -
                      (item.product?.discount / 100) * item.product?.sell_price),
                    aquariumProduct: item.product._id,
                  });
                }
                //normal product
                else {
                  orderItems.push({
                    name: item.product.name,
                    qty: item.quantity,
                    image: item.productImages[0].img,
                    price:
                      item.product?.sell_price -
                      (item.product?.discount / 100) * item.product?.sell_price,
                    product: item.product._id,
                  });
                }

                subTotal =
                  subTotal +
                  item.quantity *
                    (item.product?.sell_price -
                      (item.product?.discount / 100) * item.product?.sell_price);
                return (
                  <>
                    <Product>
                      <ProductDetail>
                        <Image src={item?.productImages[0]?.img} />
                        <Details>
                          <ProductName>
                            <b>Product:</b> {item.product.name}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> #{item.product._id}
                          </ProductId>
                          {item?.color && (
                            <ProductSize>
                              <b>Color:</b> {item.color}
                              <ProductColor color={item.color} />
                            </ProductSize>
                          )}

                          {item?.size && (
                            <ProductSize>
                              <b>Size:</b> {item.size}
                            </ProductSize>
                          )}
                          {item?.product?.thickness && (
                            <ProductSize>
                              <b>Thickness:</b> {item.product.thickness} cm
                            </ProductSize>
                          )}

                          {item?.flavour && (
                            <ProductSize>
                              <b>Flavour:</b> {item.flavour}
                            </ProductSize>
                          )}
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductPrice>
                          QAR {(item.product.sell_price -
                          (item.product.discount / 100) * item.product.sell_price)} x {item.quantity}
                        </ProductPrice>
                      </PriceDetail>
                    </Product>
                    <Hr />
                  </>
                );
              })}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>
                  QAR{" "}
                  {items
                    .reduce(
                      (acc, item) =>
                        acc + item.quantity * (item.product.sell_price -
                          (item.product.discount / 100) * item.product.sell_price),
                      0
                    )
                    .toFixed(2)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>QAR {shippingPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Reward Balance</SummaryItemText>
                <SummaryItemPrice> {data?.amount} Points</SummaryItemPrice>
              </SummaryItem>
              {data?.amount > 0 && (
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label="Use Rewards"
                />
              )}

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>

                <SummaryItemPrice>QAR {total}</SummaryItemPrice>
              </SummaryItem>
              {items.length > 0 && (
                <Button onClick={handleCheckout}>Pay Now</Button>
              )}
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </Fragment>
  );
};

export default ConfirmOrder;

const Container = styled.div`
  margin-top: 130px;
  ${mobile({ marginTop: "120px" })}
`;

const Wrapper = styled.div`
  padding: 30px;
  margin-bottom: 100px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  /* text-decoration: underline; */
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "400",
    marginTop: "20px",
  })}
`;
const DeleteBtn = styled.div`
  font-size: 15px;
  font-weight: 200;
  margin-bottom: 10px;

  ${mobile({ marginBottom: "20px" })}

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ef6c00;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;
