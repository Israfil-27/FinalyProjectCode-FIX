import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, List, Card, Form, Rate, Input } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import "./ProductScreens.scss";
import Rating from "../../components/Rating/Rating";
import { ProductScreenTypes } from "../../components/types/type";
import { useGetProductsDetailsQuery, useCreateReviewMutation } from "../../slices/ProductApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { addToCart } from "../../slices/cardSlices";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const qtyIncrease = () => setQty(qty + 1);
  const qtyDecrease = () => setQty(qty - 1 < 0 ? 0 : qty - 1);

  const { data: product, isLoading, refetch, error }: ProductScreenTypes = useGetProductsDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandle = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Rəy göndərildi");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("error");
    }
  };

  return (
    <div className="productScreen">
      <Link to="/">
        <Button className="Button">
          <FaArrowLeft /> Geri Dön
        </Button>
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="error" message={error?.data.message || error.error} />
      ) : (
        product && (
          <>
            <Row gutter={[16, 16]}>
              <Col md={8}>
                <Image src={product.image} alt={product.name} />
              </Col>
              <Col md={8}>
                <List>
                  <List.Item>
                    <h3>{product.name}</h3>
                  </List.Item>
                  <List.Item>
                    <Rating
                      value={Number(product.rating)}
                      text={`Baxışlar ${product.numReviews} `}
                    />
                  </List.Item>
                  <List.Item>Qiymət: {product.price} AZN</List.Item>
                  <List.Item>
                    <b>Təsvir:</b> {product.description}
                  </List.Item>
                </List>
              </Col>
              <Col md={8}>
                <Card>
                  <List>
                    <List.Item>
                      <b>Qiymət: </b>
                      {product.price} AZN
                    </List.Item>
                    <List.Item>
                      <b>Stok:</b>{" "}
                      {product.countInStock > 0 ? (
                        <span>{product.countInStock}</span>
                      ) : (
                        <span>stokda yoxdur</span>
                      )}
                    </List.Item>
                    {product.countInStock > 0 && (
                      <List.Item>
                        <Form onFinish={addToCartHandle}>
                          <Form.Item label="Miqdar">
                            <div className="qty">
                              <Button onClick={qtyDecrease}>-</Button>
                              <Input
                                type="number"
                                value={qty}
                                onChange={(e) => setQty(parseInt(e.target.value))}
                                min={1}
                                max={product.countInStock}
                              />
                              <Button onClick={qtyIncrease}>+</Button>
                            </div>
                          </Form.Item>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Səbətə Əlavə Et
                            </Button>
                          </Form.Item>
                        </Form>
                      </List.Item>
                    )}
                  </List>
                </Card>
              </Col>
            </Row>
            <Row className="review">
              <Col md={12}>
                <h2>Rəylər</h2>
                {product.reviews.length === 0 && (
                  <Message message={"Heç bir rəy yoxdur"} type="error" />
                )}
                <List>
                  {product.reviews.map((review: any) => (
                    <List.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rate value={review.rating}></Rate>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </List.Item>
                  ))}
                  <List.Item>
                    <h2>Müştəri rəyi yazın</h2>
                    {loadingProductReview && <Loader />}
                    {userInfo ? (
                      <form onSubmit={submitHandler} className="custom-form">
                        <div className="form-group">
                          <label htmlFor="rating">Reytinq</label>
                          <select
                            name="rating"
                            id="rating"
                            className="rating-select"
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="0">Seçin...</option>
                            <option value="1">1 - Pis</option>
                            <option value="2">2 - Əla</option>
                            <option value="3">3 - Yaxşı</option>
                            <option value="4">4 - Çox Yaxşı</option>
                            <option value="5">5 - Mükəmməl</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="comment">Rəy</label>
                          <textarea
                            id="comment"
                            name="comment"
                            className="comment-textarea"
                            placeholder="Rəyinizi buraya yazın."
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className="form-group submit-button">
                          <button
                            disabled={loadingProductReview}
                            type="submit"
                          >
                            Göndər
                          </button>
                        </div>
                      </form>
                    ) : (
                      <Link to={"/login"}>
                        <Message message="Daxil ol" type="success" />
                      </Link>
                    )}
                  </List.Item>
                </List>
              </Col>
            </Row>
          </>
        )
      )}
    </div>
  );
};

export default ProductScreen;
