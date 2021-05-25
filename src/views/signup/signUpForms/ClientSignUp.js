import { ServerIP } from "../../../assets/config";
import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  DatePicker,
  Space,
} from "antd";
import {
  UnlockOutlined,
  UserOutlined,
  DownCircleTwoTone,
} from "@ant-design/icons";
import moment from "moment";
import "antd/dist/antd.css";
import CountrySelector from "../../sharedComponents/CountrySelector";

const { Option } = Select;
const { Title } = Typography;

export default function ClientSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const login = () => {
    axios
      .post(`${ServerIP}/api/v1/client/authenticate/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res, res.data.token);
        alert(res.data.Message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Title level={5}>Client signup</Title>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
            {
              type: "text",
              message: "name should be a characters only",
            },
          ]}
          onChange={(e) => {
            setName(e.target.value);
          }}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>
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
        <Form.Item>
          <Space direction="vertical">
            <DatePicker
              placeholder="date of birth"
              format="YYYY-MM-DD"
              onChange={(date, dateString) => {
                setDateOfBirth(dateString);
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: "please select your gender",
            },
          ]}
        >
          <Select
            placeholder="Select your gender"
            suffixIcon={<DownCircleTwoTone />}
            allowClear
            onChange={(gender) => {
              setGender(gender);
            }}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button type="primary" block htmlType="submit" onClick={login}>
              SignUp
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
