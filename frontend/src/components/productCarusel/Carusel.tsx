import React from "react";
import { useGetTopProductsQuery } from "../../slices/ProductApiSlice";
import { Carousel, Image } from "antd";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import "./index.scss"; // SCSS dosyasını içe aktar

const ProductCarousel: React.FC = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return (
    <div className="product-carousel-container">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error} />
      ) : (
        <Carousel autoplay effect="fade">
          {products.map((product:any) => (
            <Carousel key={product._id} className="carousel-item">
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} />
                <div className="carousel-caption">
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </div>
              </Link>
            </Carousel>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;
