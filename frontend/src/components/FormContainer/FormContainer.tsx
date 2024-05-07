import { Col, Layout, Row } from "antd";
import "./fromContainer.scss";
const { Content } = Layout;
const FormContainer = ({ children }: any) => {
  return (
    <Content>
      <Row className="row">
        <Col>{children}</Col>
      </Row>
    </Content>
  );
};

export default FormContainer;
