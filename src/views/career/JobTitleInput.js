import React from "react";
import { Form, Input } from "antd";

export default function JobTitle(props) {
  const changeHandler = (event) => {
    props.onNameInputChange(event.target.value);
  };

  return (
    <Form.Item
      name="JobTitle"
      label="Job title"
      rules={[
        {
          required: true,
          message: "Please input your job title!",
        },
      ]}
      onChange={changeHandler}
    >
      <Input placeholder="job title" />
    </Form.Item>
  );
}
