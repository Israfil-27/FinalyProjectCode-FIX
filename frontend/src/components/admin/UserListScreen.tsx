import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Table, Button, Space, Alert } from "antd";
import Loader from "../../components/Loader/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const UserListScreen = () => {
  const { data, isLoading,refetch,error  } = useGetUsersQuery({ status: 'active' });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandle = async (id: string) => {
    if (window.confirm("Eminsiniz mi?")) {
      try {
        await deleteUser(id);
        toast.success("İstifadəçi silindi");
        refetch();
      } catch (err) {
        toast.error("Error");
        console.log(err);
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
      title: "AD",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <Link to={`mailto:${email}`}>{email}</Link>,
    },
    {
      title: "ADMIN",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (
        <span style={{ color: isAdmin ? "green" : "red" }}>
          {isAdmin ? <FaCheck /> : <FaTimes />}
        </span>
      ),
    },
    {
      title: "ƏMƏLIYATLAR",
      key: "actions",
      render: (record: User) => (
        <Space>
          <Link to={`/admin/user/${record._id}/edit`}>
            <Button type="primary" icon={<FaEdit />} />
          </Link>
          <Button
            type="dashed"
            icon={<FaTrash />}
            onClick={() => deleteHandle(record._id)}
            loading={loadingDelete}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>İstifadəçilər</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert message="Bir xəta baş verdi." type="error" />
      ) : (
        <Table dataSource={data} columns={columns} />
      )}
    </div>
  );
};

export default UserListScreen;
