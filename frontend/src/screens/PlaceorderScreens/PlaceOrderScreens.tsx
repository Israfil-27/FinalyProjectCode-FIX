import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/checkoutSteps/CheckoutSetps";
import { Button, Card, Col, Divider, List, Row } from "antd";
import { toast } from "react-toastify";
import Message from "../../components/Message/Message.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { useCreateOrderMutation } from "../../slices/orderApiSlices.jsx";
import { clearCartItems } from "../../slices/cardSlices.tsx";

const PlaceOrderScreens = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={16}>
          <Divider />
          <h2>Sifarişinizi Təsdiq Edin</h2>
          <Divider />
          <List
            header={<h3>Çatdırılma Məlumatları</h3>}
            dataSource={[cart.shippingAddress]}
            renderItem={(item: any) => (
              <List.Item>
                <p>
                  <strong>Ünvan:</strong> {item.address}, {item.city},{" "}
                  {item.postCode}, {item.country}
                </p>
              </List.Item>
            )}
          />
          <Divider />
          <List
            header={<h3>Ödəniş Metodu</h3>}
            dataSource={[{ method: cart.paymentMethod }]}
            renderItem={(item: any) => (
              <List.Item>
                <p>
                  <strong>Metod:</strong> {item.method}
                </p>
              </List.Item>
            )}
          />
          <Divider />
          <List
            header={<h3>Sifariş Məhsulları</h3>}
            dataSource={cart.cartItems}
            renderItem={(item: any) => (
              <List.Item>
                <Row justify="space-between" align="middle">
                  <Col>
                    <img
                      src={item.image}
                      alt=""
                      style={{ maxWidth: "100px", borderRadius: "8px" }}
                    />
                  </Col>
                  <Col>
                    {" "}
                    {item.name} x {item.qty}
                  </Col>
                  <Col>
                    Qiymət: {item.qty} * {item.price} = AZN{" "}
                    {item.qty * item.price}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <Divider />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <List itemLayout="horizontal">
              <List.Item>Sifariş Özeti</List.Item>
              <List.Item>
                <Row>
                  <Col>Qiymet :</Col>
                  <Col>AZN {cart.itemsPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Çatdırılma Dəyəri :</Col>
                  <Col>AZN {cart.shippingPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Vergi Qiyməti :</Col>
                  <Col>AZN {cart.taxPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                <Row>
                  <Col>Ümumi Qiymət :</Col>
                  <Col>AZN {cart.totalPrice}</Col>
                </Row>
              </List.Item>
              <List.Item>
                {error && <Message type="error" message={"error"} />}
              </List.Item>

              <List.Item>
                <Button
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Sifarişi Təsdiqlə
                </Button>
                {isLoading && <Loader />}
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreens;
