import React from "react";
import { ProductType } from "../types/type";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "./product.scss"
import Rating from "../Rating/Rating";
const Product: React.FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div className="container">
      <Card className="card" hoverable>
        <Link className="card-img-div" to={`/product/${product._id}`}>
            <img  src={product.image}/>
        </Link>
        <Link className="card-title" to={`/product/${product._id}`}>
          <strong>{product.name}</strong>
        </Link>
        <div>{<Rating value={product.rating} text={`${product.numReviews} Rewievs`}/>}</div>
        <h3>${product.price}</h3>
      </Card>
    </div>
  );
};

export default Product;
