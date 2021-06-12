import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , Steps, message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import { Redirect } from "react-router-dom";

const { Step } = Steps;

class AddItem extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        logo:"",
        categories:[],
        submitted:false,
      };
  }

  async componentDidMount() {
    this.getCategories();
    this.setState({submitted:false});
  }

  getCategories=async ()=>{
    const response = await axios.get(`${ServerIP}/api/v1/provider/categories/getall`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });
    this.setState({
        categories:response.data,
    },()=>console.log(this.state.categories))

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
    axios.post(`${ServerIP}/api/v1/provider/items/add`, 
    {
        name:values.name,
        logo:this.state.logo,
        price:values.price,
        summary:values.summary,
        category_id:values.category_id
    },
    {headers: {
        Authorization: `Token ${this.state.token}`,
    }}
  );
    console.log(values);
    if(values.addItemOptions){
      this.setState({submitted:true});
    }

  };
  
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
        
    
    return (
      <div className="container">
        {this.state.submitted? <Redirect to="/additemoption"/> : ""}
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Add Item</h2><hr/>
                
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      >
          <Form.Item
              label="Item name"
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

    

          <Form.Item name="summary" label="Summary" 
              rules={[
              {
                  required: true,
                  message: 'Please input category name',
              },
              ]}>
              <Input.TextArea />
          </Form.Item>

          <Form.Item label="Price">
              <Form.Item name="price" noStyle 
              rules={[
              {
                  required: true,
                  message: 'Please input category name',
              },
              ]}>
                  <InputNumber  />
              </Form.Item>
              <span className="ant-form-text"> LE</span>
          </Form.Item>
          
          

          <Form.Item label="Category" name="category_id">
              <Select>
              {this.state.categories.map(category=>{
                  console.log("cat",category);
                  return(
                  <Select.Option value={category.id}>{category.name}</Select.Option>
                  )
              })}
              </Select>
          </Form.Item>

          <Form.Item>
              <UploadLogoInput
                  onUploadLogoInputChange={(value) => this.setState({logo:value})}
              />
          </Form.Item>

          <Form.Item {...tailLayout} name="addItemOptions" valuePropName="checked">
            <Checkbox>Add item option</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
              Create
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

export default AddItem;