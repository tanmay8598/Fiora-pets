import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "./BestSellerCard.css";

const BestSellerCard = ({ product }) => {
  const options = {
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  const discount = (product?.discount / 100) * product.sell_price;
  const newprice = Number(product.sell_price - discount).toFixed(2);
  const imgsrc = `https://fiora-pets-s3.s3.amazonaws.com/${product?._id}.jpg`;

  return (
    <Link
      className="productCard1"
      to={`/product/${product?.groupId}`}
      state={{ Data: product }}
    >
      <img src={imgsrc} alt={product.name} />
      {product?.discount > 0 && <div className="deal-container">ON SALE</div>}
      <p>{product.name}</p>
      <div>
        <Rating style={{ fontSize: "1.2rem" }} {...options} />
      </div>

      {discount > 0 ? (
        <>
          <span
            style={{
              fontSize: "20px",
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
            QAR {`${product.sell_price}`}{" "}
          </span>
        </>
      ) : (
        <span
          style={{
            fontSize: "15px",
          }}
        >
          QAR {`${product.sell_price}`}{" "}
        </span>
      )}
    </Link>
  );
};

export default BestSellerCard;
