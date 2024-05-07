import { Col, Row } from "antd";
import Product from "../components/Product/Product";
import { useGetProductsQuery } from "../slices/ProductApiSlice.tsx";
import Loader from "../components/Loader/Loader.tsx";
import "./screens.scss";
import Message from "../components/Message/Message.tsx";
import { useParams } from "react-router-dom";
import Paginatio from "../components/paginate/Pagination.tsx";
import ProductCarusel from "../components/productCarusel/Carusel.tsx";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const pageNumber = useParams()?.pageNumber;
  const keyword = useParams()?.keyword;
  const { data, isLoading, error }: any = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <div>
      {!keyword ? (
        <ProductCarusel />
      ) : (
        <Link to="/" className="btn btn-light md-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : error ? (
        <Message type="error" message={error?.data?.message || error.error} />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {data.products.map((product: any) => (
              <Col key={product._id} xs={24} sm={12} md={12} lg={8} xl={6}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginatio
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
