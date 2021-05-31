import React from "react";
import { Form, Select, Divider, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

let index = 0;

export default class ProviderTypeInput extends React.Component {
  state = {
    items: ["Restaurant", "Store", "Pharmacy"],
    name: "",
  };

  onNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  changeHandler = (value) => {
    this.props.onProviderChange(value);
  };

  addItem = () => {
    const { items, name } = this.state;
    this.setState({
      items: [...items, name || `New item ${index++}`],
      name: "",
    });
  };

  render() {
    const { items, name } = this.state;
    return (
      <Form.Item label="Enter your type : ">
        <Select
          style={{ width: 240 }}
          placeholder="custom dropdown render"
          onChange={this.changeHandler}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
                <Input
                  style={{ flex: "auto" }}
                  value={name}
                  onChange={this.onNameChange}
                />
                <a
                  style={{
                    flex: "none",
                    padding: "8px",
                    display: "block",
                    cursor: "pointer",
                  }}
                  onClick={this.addItem}
                >
                  <PlusOutlined /> Add item
                </a>
              </div>
            </div>
          )}
        >
          {items.map((item) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}
