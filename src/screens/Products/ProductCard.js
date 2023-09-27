import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./ProductCard.css";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { add } from "../../redux/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const discount = (product.discount / 100) * product.sell_price;
  const newprice = Number(product.sell_price - discount).toFixed(2);

  const imgsrc = `https://fiora-pets-s3.s3.amazonaws.com/${product?._id}.jpg`;

  const handleSubmit = () => {
    // dispatch(add({ product, quantity, color, size, flavour, productImages }));
    navigate("/cart");
  };

  return (
    <Link
      className="productCard"
      to={`/product/${product?.groupId}`}
      state={{ Data: product }}
    >
      <img
        src={imgsrc}
        alt={product.name}
        style={{ height: "200px", width: "200px", objectFit: "contain" }}
      />
      {product?.discount > 0 && <div className="deal-container">ON SALE</div>}
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
      </div>

      {discount > 0 ? (
        <>
          <span
            style={{
              fontSize: "22px",
            }}
          >
            QAR {`${newprice}`}
          </span>

          <span
            style={{
              textDecoration: "line-through",
              color: "grey",
              fontSize: "18px",
            }}
          >
            QAR {`${product.sell_price}`}
          </span>
        </>
      ) : (
        <span
          style={{
            fontSize: "22px",
          }}
        >
          QAR {`${product.sell_price}`}
        </span>
      )}
      {/* <Button
        style={{
          position: "absolute",
          bottom: "2px",
          marginTop: "120px",
          backgroundColor: "teal",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Add to Cart
      </Button> */}
    </Link>
  );
};

export default ProductCard;
