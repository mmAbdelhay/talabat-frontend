import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , Steps, message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";

const { Step } = Steps;

class FirstStep extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        logo:"",
        categories:[],
      };
  }

  async componentDidMount() {
    this.getCategories();
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
          span: 4,
        },
        wrapperCol: {
          span: 24,
        },
    };
    const tailLayout = {
        wrapperCol: {
          offset: 2,
          span: 16,
        },
    };

    const onFinish = (values) => {
        this.props.next(values,this.state.logo)
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

            <Form.Item style={{marginLeft:"13%"}}>
                <UploadLogoInput
                    onUploadLogoInputChange={(value) => this.setState({logo:value})}
                />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Create & Proceed
                </Button>
            </Form.Item>
        </Form>
        
    );
    }
}

export default FirstStep;

