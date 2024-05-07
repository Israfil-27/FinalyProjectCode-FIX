import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { useProfileMutation } from "../../slices/userApiSlices";
import { setCredentials } from "../../slices/authSlices";
import { Col, Row, Form, Input, Button, Table, Space } from "antd";
import { useGetMyOrdersQuery } from "../../slices/orderApiSlices.tsx";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile ,error}] =
    useProfileMutation();
    const {data , isLoading} = useGetMyOrdersQuery({ status: 'active' })

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Şifrələr uyğun gəlmir");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profil yeniləndi");
      } catch (err) {
        toast.error("Profil yeniləmə xətası");
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
      title: "Tarix",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => createdAt.substring(0, 10),
    },
    {
      title: "Toplam Məbləğ",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Ödənib",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid: boolean, record: any) =>
        isPaid ? (
          <span style={{ color: "green" }}>
            {record.paidAt.substring(0, 10)}
          </span>
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
    },
    {
      title: "Çatdırıldı",
      dataIndex: "isDelivered",
      key: "isDelivered",
      render: (isDelivered: boolean) => (isDelivered ? "Bəli" : "Xeyr"),
    },
    {
      title: "Əməliyyatlar",
      key: "action",
      render: ( record: any) => (
        <Space size="middle">
          <Link to={`/placeorder`}>
            <Button type="primary" onClick={() => handleDetails(record)}>
              Detaylar
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const handleDetails = (record: any) => {
    console.log("Detaylar", record);
    // Detaylar için yapılacak işlemler burada tanımlanacak
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <h2>İstifadəçi Profili</h2>
        <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Ad">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="E-poçt">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Yeni Şifrə">
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Yeni Şifrənin Təsdiqi">
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Profili Yenilə
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form.Item>
        </Form>
      </Col>
      <Col span={12}>
        <h2>Sifarişlərim</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message message={"Xəta"} type={"error"} />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowKey="_id"
          />
        )}
      </Col>
    </Row>
  );
};

export default Profile;
