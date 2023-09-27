import { Add, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {
  incrementQuantity,
  decrementQuantity,
  remove,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  const handleQuantity = (type, id) => {
    if (type === "dec") {
      //delete
      dispatch(decrementQuantity(id));
    } else {
      //add
      dispatch(incrementQuantity(id));
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({items?.length})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {items?.map((item) => {
              const discount =
                (item.product.discount / 100) * item.product.sell_price;
              const newprice = Number(
                item.product.sell_price - discount
              ).toFixed(2);
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
                      <ProductAmountContainer>
                        <Remove
                          onClick={() =>
                            handleQuantity("dec", item.product._id)
                          }
                        />
                        <ProductAmount>{item.quantity}</ProductAmount>
                        {item.quantity < item.product.countInStock && (
                          <Add
                            onClick={() =>
                              handleQuantity("inc", item.product._id)
                            }
                          />
                        )}
                      </ProductAmountContainer>
                      <DeleteBtn
                        onClick={() => dispatch(remove(item.product._id))}
                      >
                        Delete
                      </DeleteBtn>
                      <ProductPrice>QAR {newprice}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              );
            })}
            {items?.length <= 0 && <Title2>Your Cart is empty.</Title2>}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                QAR{" "}
                {items
                  ?.reduce(
                    (acc, item) =>
                      acc +
                      item.quantity *
                        (item.product.sell_price -
                          (item.product.discount / 100) *
                            item.product.sell_price),
                    0
                  )
                  .toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>

            <br />
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                QAR{" "}
                {items
                  ?.reduce(
                    (acc, item) =>
                      acc +
                      item.quantity *
                        (item.product.sell_price -
                          (item.product.discount / 100) *
                            item.product.sell_price),
                    0
                  )
                  .toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            {items?.length > 0 && (
              <Button onClick={() => navigate("/shipping")}>
                CHECKOUT NOW
              </Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

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
const Title2 = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-top: 100px;
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
  border-radius: 10px;
  cursor: pointer;
  background-color: #ef6c00;
  color: white;
  border: none;
  ${mobile({
    margin: "0 auto",
    borderRadius: "10px",
    fontWeight: "400",
    padding: "4",
    marginBottom: "50px",
  })}
  &:hover {
    opacity: 0.8;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
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
  width: 220px;
  height: 220px;
  object-fit: contain;
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
  ${mobile({ marginBottom: "20px" })}
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
