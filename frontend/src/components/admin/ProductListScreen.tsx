import React from "react";
import { Button, Col, Row, Table } from "antd";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/ProductApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductListScreen: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
  });

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Eminsiniz?")) {
      try {
        await deleteProduct(id);
        toast.success("Məhsul silindi");
        refetch();
      } catch (err) {
        toast.error("Error");
        console.log(err);
      }
    }
  };

  const createProductHandle = async () => {
    if (window.confirm("Yeni bir məhsul yaratmaq istədiyinizə əminsinizmi?")) {
      try {
        await createProduct({});
        refetch();
      } catch (error) {
        toast.error("Xəta");
      }
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Ad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qiymət",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Kateqoriya",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brend",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Əməliyyatlar",
      key: "actions",
      render: (record: any) => (
        <>
          <Link to={`/admin/product/${record._id}/edit`}>
            <Button>
              <FaEdit />
            </Button>
          </Link>
          <Button onClick={() => deleteHandler(record._id)}>
            <FaTrash />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Məhsullar</h1>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={createProductHandle}>
            <FaEdit /> Yeni Məhsul Əlavə Et
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message message={error.message} type="error" />
      ) : (
        <Table
          columns={columns}
          dataSource={data?.products}
          rowKey="_id"
          pagination={{
            total: data?.pageNumber,
            pageSize: 10,
            onChange: (page) => {
              refetch({ pageNumber: page });
            },
          }}
        />
      )}
    </div>
  );
};

export default ProductListScreen;
