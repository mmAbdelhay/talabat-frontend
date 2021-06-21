import { ServerIP } from "../../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, Typography, message } from "antd";
import {
  UnlockOutlined,
  UserOutlined,
  DownCircleTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Option } = Select;
const { Title } = Typography;

export default function LoginForm() {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    axios
      .post(`${ServerIP}/api/v1/${role}/authenticate/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data.token));
        message.success("logged in successfully");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", role);
        window.location.href = "/";
      })
      .catch((err) => {
        message.error(`form is invalid ${err.response.data.Message}`);
      });
  };

  return (
    <div style={{ height: 300 }}>
      <Title level={5}>Login page</Title>
      <Form
        name="basic"
        shouldupdate="true"
        form={form}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "password should be 6 characters or more",
            },
          ]}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <Input.Password prefix={<UnlockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "please select your role",
            },
          ]}
        >
          <Select
            placeholder="Select your role"
            suffixIcon={<DownCircleTwoTone />}
            allowClear
            onChange={(role) => {
              setRole(role);
            }}
          >
            <Option value="client">Client</Option>
            <Option value="provider">Provider</Option>
            <Option value="superuser">Superuser</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            onClick={handleLogin}
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
