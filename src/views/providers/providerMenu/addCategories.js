import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, message } from 'antd';



class AddCategory extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
      };
  }

  formRef = React.createRef()

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
        ).then((res) => {
          message.success(`${res.data['Message']}`);
          this.formRef.current.setFieldsValue({
            name: "",
          });
        })
        .catch((res) => {
          message.error(`${res.data['Message']}`);
        });
      };
    
      const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
        message.error(errorInfo.errorFields[0].errors[0]);
      };

       return (

        <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Add Category</h2><hr/>
      

                    <Form
                      {...layout}
                      name="basic"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      ref={this.formRef}
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

                </div>


              <div className="col"></div>

            </div>
          </div>
  );
  }
}

export default AddCategory;