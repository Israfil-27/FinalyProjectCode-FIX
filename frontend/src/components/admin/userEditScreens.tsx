import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlices";
import "./scss/userEdit.scss";



const UserEditScreen = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: user, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateUser({ userId, ...values });
      message.success("İstifadəçi uğurla yeniləndi");
      refetch();
    } catch (err) {
      toast.error("Error");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="user-edit-container">
      <div className="user-edit-header">
        <a href="/admin/userlist" className="go-back-button">
          Geri Dön
        </a>
        <h1>İstifadəçini Düzənlə</h1>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Ad"
          name="name"
          rules={[
            { required: true, message: "Zəhmət olmasa adınızı daxil edin" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Adınız" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Zəhmət olmasa email adresinizi daxil edin",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="isAdmin" valuePropName="checked">
          <Checkbox>İdarəçi</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            İstifadəçini Yenilə
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserEditScreen;
