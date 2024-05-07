import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, List, Image } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import Message from "../../components/Message/Message.tsx";
import "./cartscreen.scss";
import { ProductType } from "../../components/types/type.ts";
import { HiOutlineChevronRight } from "react-icons/hi";
import { removeFormCart } from "../../slices/cardSlices.tsx";

const CartScreens = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  const removeFormCartHandle = async (id: string) => {
    dispatch(removeFormCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={12}>
        <h1 className="my-cart" style={{ marginBottom: "20px" }}>
          Səbətim
        </h1>
        {cartItems.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
            <Message message={`Səbətiniz boşdur`} type="success"></Message>
            <Button className="cart-shoping">
              <Link style={{ fontSize: "1.7rem" }} to={"/"}>
                Alış-verişə Başla
              </Link>
            </Button>
          </div>
        ) : (
          <List>
            {cartItems.map((item: ProductType) => (
              <List.Item key={item._id}>
                <Row style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                  <Col md={7}>
                    <Image src={item.image} alt={item.name} />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>{`AZN ${item.price}`}</Col>
                  <Col md={4}>
                    <div className="qty">
                      <b>Miqdarı</b>
                      <input type="text" value={item.qty} />
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button onClick={() => removeFormCartHandle(item._id)} type="default">
                      <FaTrashAlt />
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            ))}
          </List>
        )}
      </Col>
      <Col md={6}>
        <List itemLayout="horizontal">
          <List.Item>
            <h2>Səbəb ({cartItems.reduce((acc: number, item: any) => acc + item.qty, 0)}) </h2>
          </List.Item>
          <List.Item className="basket-price">
            Cəmi AZN {cartItems.reduce((acc: number, item: any) => acc + item.qty * item.price, 0).toFixed()}
          </List.Item>
          <List.Item>
            <Button disabled={cartItems.length == 0} onClick={checkoutHandler} className="basket-Button">Səbəti Təsdiqlə<HiOutlineChevronRight /></Button>
          </List.Item>
        </List>
      </Col>
    </Row>
  );
};

export default CartScreens;
