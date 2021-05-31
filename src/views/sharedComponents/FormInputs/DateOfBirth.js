import React from "react";
import { Form, Space, DatePicker } from "antd";

export default function DateOfBirthInput(props) {
  const changeHandler = (value, valueString) => {
    props.onSelectDateOfBirth(valueString);
  };

  return (
    <Form.Item label="Date of birth">
      <Space direction="vertical">
        <DatePicker
          placeholder="date of birth"
          format="YYYY-MM-DD"
          onChange={changeHandler}
        />
      </Space>
    </Form.Item>
  );
}
