import { useParams } from "react-router-dom";
import { Col, Row, Image, Typography, Divider, Button, Empty } from "antd";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { useGetOrderDetailsQuery } from "../../slices/orderApiSlices.jsx";
import { useDeliverOrderMutation } from "../../slices/orderApiSlices.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const { Title, Text } = Typography;

const OrderScreens = () => {
  const { id: orderId } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message message="error" type="error" />;
  }
  const handleConfirmCart = () => {
    console.log("Səbət təsdiqləndi!");
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    order.orderItems.forEach((item: any) => {
      totalPrice += item.qty * item.price;
    });
    return totalPrice;
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Sifariş göndərildi");
    } catch (err) {
      toast.error("Göndərmə xətası");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Sifariş Detalları</Title>
      <Divider />
      <Row>
        <Col md={6}>
          <Title level={3}>Göndərilmə Məlumatları</Title>
          <Text strong>Ad:</Text> {order?.user?.name}
          <br />
          <Text strong>Email:</Text> {order?.user?.email}
          <br />
          <Text strong>Ünvan:</Text> {order?.shippingAddress.address},{" "}
          {order?.shippingAddress.city}, {order?.shippingAddress.country}{" "}
          {order?.shippingAddress.postCode}
          <br />
        </Col>
        <Col md={6}>
          <Title level={3}>Ödəniş Məlumatları</Title>
          <Text strong>Metod:</Text> {order.paymentMethod}
          <br />
        </Col>
        <Col
          md={12}
          style={{
            position: "sticky",
            top: 0,
            right: 0,
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            maxHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Title level={3}>Səbət</Title>
          {order.orderItems.length === 0 ? (
            <Empty description="Səbətiniz boşdur" />
          ) : (
            <div>
              {order.orderItems.map((item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col span={4}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        preview={false}
                        style={{ borderRadius: "8px" }}
                      />
                    </Col>
                    <Col span={20}>
                      <Text strong>{item.name}</Text>
                      <Text>
                        Qiymət: AZN
                        {`${item.qty} X ${item.price}= AZN${
                          item.qty * item.price
                        }`}
                      </Text>
                      <Text>Toplam: AZN{item.qty * item.price}</Text>
                    </Col>
                  </Row>
                </div>
              ))}
              <Divider />
              <Title level={4}>Səbət Özeti</Title>
              <Text strong>Ümumi Qiymət:</Text> AZN{calculateTotalPrice()}
              {!order.isPaid && (
                <div>
                  <div>
                    <Button
                      type="primary"
                      style={{ marginTop: "16px" }}
                      onClick={handleConfirmCart}
                    >
                      Səbəti Təsdiqlə
                    </Button>
                  </div>
                </div>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo?.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <div>
                    <Button type="primary" onClick={deliverOrderHandler}>
                      Sifarişi Göndər
                    </Button>
                  </div>
                )}
            </div>
          )}
        </Col>
      </Row>
      <Divider />
      <Row></Row>
    </div>
  );
};

export default OrderScreens;
