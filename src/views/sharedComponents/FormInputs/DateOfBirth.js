import React from "react";
import { Form, Space, DatePicker } from "antd";

export default function DateOfBirthInput(props) {
  const changeHandler = (value, valueString) => {
    props.onSelectDateOfBirth(valueString);
  };

  return (
    <Form.Item>
      <Space direction="vertical">
        <DatePicker
          placeholder="date of birth"
          format="YYYY-MM-DD"
          style={{ width: "427.5%" }}
          onChange={changeHandler}
        />
      </Space>
    </Form.Item>
  );
}
