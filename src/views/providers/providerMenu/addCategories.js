import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox } from 'antd';



class AddCategory extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
      };
  }

  render(){
    const layout = {
        labelCol: {
          span: 0,
        },
        wrapperCol: {
          span: 24,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 0,
          span: 16,
        },
      };

      const onFinish = (values) => {
        console.log('Success:', values);
        console.log(this.state.token);
        axios.post(`${ServerIP}/api/v1/provider/categories/add`, 
            values,
            {headers: {
                Authorization: `Token ${this.state.token}`,
            }}
        );
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

       return (
    <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Category name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input category name',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
  }
}

export default AddCategory;