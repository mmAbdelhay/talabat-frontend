import React from "react";
import { Form, Select } from "antd";
import { DownCircleTwoTone } from "@ant-design/icons";

const { Option } = Select;

export default function GenderInput(props) {
  const changeHandler = (value) => {
    props.onGenderChange(value);
  };

  return (
    <Form.Item
      name="gender"
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
        onChange={changeHandler}
      >
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
      </Select>
    </Form.Item>
  );
}
