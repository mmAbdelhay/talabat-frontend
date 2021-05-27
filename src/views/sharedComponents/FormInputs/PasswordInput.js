import React from "react";
import { Form, Input } from "antd";
import { UnlockOutlined } from "@ant-design/icons";

export default function PasswordInput(props) {
  const changeHandler = (value) => {
    props.onPasswordInputChange(value.target.value);
  };

  return (
    <Form.Item
      name="password"
      label="Password"
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
      onChange={changeHandler}
    >
      <Input.Password prefix={<UnlockOutlined />} placeholder="Password" />
    </Form.Item>
  );
}
