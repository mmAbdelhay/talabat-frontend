import React from "react";
import { Form, Space, DatePicker } from "antd";
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';


export default function DateOfBirthInput(props) {
  const changeHandler = (value, valueString) => {
    props.onSelectDateOfBirth(valueString);
  };

  return (
    <Form.Item label="Date of birth">
      <Space direction="vertical">
        {props.value?
         <DatePicker
         defaultValue={moment(`{${props.value}}`, dateFormat)}
         placeholder="date of birth"
         format="YYYY-MM-DD"
         onChange={changeHandler}
       />
        :
        <DatePicker
        placeholder="date of birth"
        format="YYYY-MM-DD"
        onChange={changeHandler}
      />
        }
        
      </Space>
    </Form.Item>
  );
}
