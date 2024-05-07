import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;

const Footers = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer style={{ position: "fixed", left: 0, bottom: 0, width: "100%", textAlign: "center" }}>
      <Row justify="center">
        <Col>
          <p>Texno I &copy; {currentYear}</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default Footers;
