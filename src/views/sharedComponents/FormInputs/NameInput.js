import React from "react";
import { Form, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function NameInput(props) {
  const changeHandler = (value) => {
    props.onNameInputChange(value.target.value);
  };

  return (
    <Form.Item
      name="name"
      label="Name"
      rules={[
        {
          required: true,
          message: "Please input your name!",
        },
      ]}
      onChange={changeHandler}
    >
      <Input prefix={<UserOutlined />} placeholder="Name" />
    </Form.Item>
  );
}
