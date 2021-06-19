import React,{Component} from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import { withRouter } from "react-router-dom";

class EditadditionalOption extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        additionalOptionId: this.props.match.params.id,
      };
  }

  formRef = React.createRef();

  async componentDidMount() {
    this.getAdditionalOption();
  }

  getAdditionalOption=async ()=>{
    const response = await axios.get(`${ServerIP}/api/v1/provider/itemadditionaloptions/getadditionaloption/${this.state.additionalOptionId}`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });

    console.log('this is resppp',response.data)


    this.formRef.current.setFieldsValue({
        option_name: response.data.option_name,
        additional_price: response.data.additional_price
      });

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
        console.log(values);
        axios.put(`${ServerIP}/api/v1/provider/itemadditionaloptions/edit/${this.state.additionalOptionId}`, 
        {
            option_name: values.option_name,
            additional_price: values.additional_price,
            
        },
        {headers: {
            Authorization: `Token ${this.state.token}`,
        }}
    ).then((res) => {
        console.log(res.data);
        message.success(`${res.data['Message']}`);
      })
      .catch((res) => {
        message.error(`${res.data['Message']}`);
      });
    
    
    
    ;
  };
  
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
   
  let report = (value)=>{
      console.log("in report",value);
  }
    
    return (
      <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Edit Additional Option</h2><hr/>
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref = {this.formRef}
      >
          <Form.Item
              label="Option name"
              name="option_name"
              rules={[
              {
                  required: true,
                  message: 'Please input section name',
              },
              ]}
          >
              <Input />
          </Form.Item>

          

      <Form.Item label="Additional Price">
              <Form.Item name="additional_price" noStyle 
              rules={[
              {
                  required: true,
                  message: 'Please additional option price',
              },
              ]}>
                  <InputNumber  />
              </Form.Item>
              <span className="ant-form-text"> LE</span>
          </Form.Item>

          <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
              Edit
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

export default withRouter(EditadditionalOption);