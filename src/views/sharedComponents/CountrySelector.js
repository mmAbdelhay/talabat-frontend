import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Form } from "antd";

function CountrySelector(props) {
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    props.onSelectCountry(value);
  };

  return (
    <Form.Item label="Select your Country">
      {props.value?
      <Select
      options={options}
      onChange={changeHandler}
      defaultValue={`${props.value}`}

    />
      :
        <Select
        options={options}
        placeholder="select your country"
        onChange={changeHandler}
      />
      }
      
    </Form.Item>
  );
}

export default CountrySelector;
