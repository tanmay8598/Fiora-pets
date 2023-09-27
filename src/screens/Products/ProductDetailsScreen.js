import { Add, Remove } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../../components/Announcement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import apiClient from "../../api/client";
import "./ProductDetailsScreen.css";
import Carousel from "react-material-ui-carousel";

import { useDispatch } from "react-redux";
import { add } from "../../redux/cartSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import Rating from "@mui/material/Rating";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import swal from "sweetalert";
import useAuth from "./../../auth/useAuth";
import ReviewCard from "./ReviewCard";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const [size, setSize] = useState("");
  const [sizes, setSizes] = useState();
  const [color, setColor] = useState("");
  const [colors, setColors] = useState();
  const [flavour, setFlavour] = useState();
  const [flavours, setFlavours] = useState();
  const [quantity, setQuantity] = useState(1);
  const [uploadVisible, setUploadVisible] = useState(false);

  //product review comment
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    value: product?.rating,
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const { user } = useAuth();

  const productImages = [];

  for (let i = 0; i < product?.image; i++) {
    if (i < 1) {
      productImages.push({
        id: i,
        img: `https://fiora-pets-s3.s3.amazonaws.com/${product?._id}.jpg`,
      });
    } else {
      productImages.push({
        id: i,
        img: `https://fiora-pets-s3.s3.amazonaws.com/${product?._id}_${i}.jpg`,
      });
    }
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const [searchParams, setSearchParams] = useSearchParams();
  // searchParams.get("");
  // console.log(searchParams);
  let { id } = useParams();

  const p1 = location?.state?.Data;

  const groupId = location?.state?.Data?.groupId;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setUploadVisible(true);
    if (groupId) {
      const { data } = await apiClient.get("/products/get-productby-groupid", {
        groupId,
      });

      setProducts(data);

      setProduct(p1);
      var allColors = data?.map((item) => {
        return item?.color?.name;
      });

      allColors = [...new Set(allColors)];
      setColors(allColors);
      setColor(p1?.color?.name);

      var allSizes = data?.map((item) => {
        return item?.size?.name;
      });
      allSizes = [...new Set(allSizes)];
      setSizes(allSizes);
      setSize(p1?.size?.name);

      var allflavours = data?.map((item) => {
        return item?.flavour?.name;
      });
      allflavours = [...new Set(allflavours)];

      setFlavours(allflavours);
      setFlavour(p1?.flavour?.name);
      setUploadVisible(false);
    } else {
      const { data } = await apiClient.get("/products/get-productby-groupid", {
        groupId: id,
      });

      setProducts(data);

      setProduct(data[0]);
      var allColors = data?.map((item) => {
        return item?.color?.name;
      });

      allColors = [...new Set(allColors)];
      setColors(allColors);
      setColor(data[0]?.color?.name);

      var allSizes = data?.map((item) => {
        return item?.size?.name;
      });
      allSizes = [...new Set(allSizes)];
      setSizes(allSizes);
      setSize(data[0]?.size?.name);

      var allflavours = data?.map((item) => {
        return item?.flavour?.name;
      });
      allflavours = [...new Set(allflavours)];

      setFlavours(allflavours);
      setFlavour(data[0]?.flavour?.name);
      setUploadVisible(false);
    }
  };

  const handleChangeSize = (e) => {
    setSize(e.target.value);
    const xyz = e.target.value;

    const product1 = products?.filter(function (el) {
      return (
        el.size?.name === xyz &&
        el.color?.name === color &&
        el.flavour?.name === flavour
      );
    });
    if (product1) {
      setProduct(product1[0]);
    }
  };
  const handleChangeColors = (e) => {
    setColor(e.target.value);

    const xyz = e.target.value;
    const product1 = products?.filter(function (el) {
      return (
        el.color?.name === xyz &&
        el.size?.name === size &&
        el.flavour?.name === flavour
      );
    });
    if (product1) {
      setProduct(product1[0]);
    }
  };
  const handleChangeFlavours = (e) => {
    setColor(e.target.value);

    const xyz = e.target.value;
    const product1 = products?.filter(function (el) {
      return (
        el.flavour?.name === xyz &&
        el.size?.name === size &&
        el.color?.name === color
      );
    });

    if (product1) {
      setProduct(product1[0]);
    }
  };

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleSubmit = () => {
    dispatch(add({ product, quantity, color, size, flavour, productImages }));
    navigate("/cart");
  };

  // const discount = product?.discount;
  const newprice =
    product?.sell_price - (product?.discount / 100) * product?.sell_price;

  const reviewSubmitHandler = async () => {
    if (product?.thickness) {
      const result = await apiClient.post(
        "/aquarium/create-aqua-product-review",
        {
          productId: product?._id,
          rating,
          comment,
          user,
        }
      );
      if (result.ok) {
        swal("Review Submitted");
      }
      setOpen(false);
      window.location.reload();
    } else {
      const result = await apiClient.post("/products/create-review", {
        productId: product?._id,
        rating,
        comment,
        user,
      });
      if (result.ok) {
        swal("Review Submitted");
      }
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      {uploadVisible ? (
        <div
          style={{
            display: "flex",
            margin: "300px auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PropagateLoader color="rgba(54, 215, 183, 1)" size={30} />
        </div>
      ) : (
        <Wrapper>
          <ImgContainer>
            <Carousel>
              {productImages &&
                productImages.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.img}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>
          </ImgContainer>

          <InfoContainer>
            <Title>{product?.name}</Title>
            <Title style={{ fontSize: "20px", color: "red" }}>
              {product?.countInStock < 1 ? "   Out of stock" : ""}
            </Title>
            <BrandName>
              By <span style={{ color: "blue" }}> {product?.brand.name}</span>
            </BrandName>
            <div>
              <Rating {...options} />
              <br />
              {product?.reviews?.length} Reviews
            </div>

            {product?.discount > 0 ? (
              <div
                style={{
                  display: "grid",
                  flexDirection: "row",
                }}
              >
                <Price2>QAR {product?.sell_price}</Price2>
                <Price>QAR {newprice}</Price>
              </div>
            ) : (
              <Price3>QAR {product?.sell_price}</Price3>
            )}

            <FilterContainer>
              {colors?.length > 0 && colors[0] !== undefined ? (
                <Filter>
                  <FilterTitle>Color</FilterTitle>

                  <FilterSize onChange={handleChangeColors}>
                    {colors?.map((item) => {
                      return (
                        <FilterSizeOption value={item} key={item}>
                          {item}
                        </FilterSizeOption>
                      );
                    })}
                  </FilterSize>
                </Filter>
              ) : (
                <></>
              )}

              {sizes?.length > 0 && sizes[0] !== undefined ? (
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={handleChangeSize}>
                    {sizes?.map((item) => {
                      return (
                        <FilterSizeOption value={item} key={item}>
                          {item}
                        </FilterSizeOption>
                      );
                    })}
                  </FilterSize>
                </Filter>
              ) : (
                <></>
              )}

              {flavours?.length > 0 && flavours[0] !== undefined ? (
                <Filter>
                  <FilterTitle>Flavour</FilterTitle>
                  <FilterSize onChange={handleChangeFlavours}>
                    {flavours?.map((item) => {
                      return (
                        <FilterSizeOption value={item} key={item}>
                          {item}
                        </FilterSizeOption>
                      );
                    })}
                  </FilterSize>
                </Filter>
              ) : (
                <></>
              )}
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                {product?.countInStock > quantity ? (
                  <>
                    <Remove onClick={() => handleQuantity("dec")} />
                    <Amount>{quantity}</Amount>
                    <Add onClick={() => handleQuantity("inc")} />
                  </>
                ) : (
                  <>
                    {/* <p style={{ fontSize: "15px" }}>Limited Stock Left</p> */}
                    <Remove onClick={() => handleQuantity("dec")} />
                    <Amount>{quantity}</Amount>
                  </>
                )}
              </AmountContainer>
            </AddContainer>
            {product?.countInStock > 0 ? (
              <BtnC onClick={handleSubmit}>ADD TO CART</BtnC>
            ) : (
              <BtnC>Out of Stock</BtnC>
            )}
            <Desc>
              <span style={{ fontWeight: 600 }}>Description:</span>{" "}
              {product?.description}
            </Desc>
            <Desc>
              <span style={{ fontWeight: 600 }}>Details:</span>{" "}
              {product?.details}
            </Desc>

            {product?.thickness && (
              <button
                className="submitReview"
                onClick={() =>
                  navigate("/custom-product", {
                    state: {
                      product,
                      quantity,
                      color,
                      size,
                      flavour,
                      productImages,
                    },
                  })
                }
              >
                Design your own aqaurium
              </button>
            )}
            <br />
            <br />
            {user && (
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            )}
            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button color="primary" onClick={reviewSubmitHandler}>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </InfoContainer>
        </Wrapper>
      )}
      <h3 className="reviewsHeading">REVIEWS</h3>
      {product?.reviews && product?.reviews[0] ? (
        <div className="reviews">
          {product?.reviews &&
            product?.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 130px;
`;

const BrandName = styled.p`
  font-size: 13px;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  margin-top: 80px;
  ${mobile({ padding: "10px", marginTop: "20px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-size: 27px;
  font-weight: 600;
  color: #bc2848;
`;
const Price3 = styled.span`
  font-weight: 600;
  font-size: 27px;
`;
const Price2 = styled.span`
  font-weight: 500;
  font-size: 17px;
  text-decoration: line-through;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%", justifyContent: "center" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Btn = styled.button`
  padding: 15px;
  border: none;
  background-color: #ef6c00;
  cursor: pointer;
  font-weight: 500;
  border-radius: 15px;
  color: white;
  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;
const BtnC = styled.button`
  padding: 15px;
  border: none;
  background-color: #ef6c00;
  cursor: pointer;
  font-weight: 500;
  border-radius: 15px;
  margin-top: 10px;
  color: white;
  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
  ${mobile({ width: "90vw" })}
`;

export default ProductDetailsScreen;
