import React, { useState } from "react";
import { Form, Space, DatePicker } from "antd";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";

export default function DateOfBirthInput(props) {
  const [err, setError] = useState(null);

  const changeHandler = (value, valueString) => {
    if (valueString > "2005-01-01") {
      setError("can't login if you're younger than 16 years");
    } else {
      setError(null);
      props.onSelectDateOfBirth(valueString);
    }
  };

  return (
    <Form.Item label="Date of birth">
      <Space direction="vertical">
        {props.value ? (
          <>
            <DatePicker
              defaultValue={moment(`{${props.value}}`, dateFormat)}
              placeholder="date of birth"
              format="YYYY-MM-DD"
              onChange={changeHandler}
            />
            {err && <span style={{ color: "red", fontSize: 13 }}>{err}</span>}
          </>
        ) : (
          <>
            <DatePicker
              placeholder="date of birth"
              format="YYYY-MM-DD"
              onChange={changeHandler}
            />
            {err && <span style={{ color: "red", fontSize: 13 }}>{err}</span>}
          </>
        )}
      </Space>
    </Form.Item>
  );
}
