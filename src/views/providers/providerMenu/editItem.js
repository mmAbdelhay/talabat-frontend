import React, { Component } from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , Steps, message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";

const { Step } = Steps;

class EditItem extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        logo:"",
        categories:[],
        itemBody:[],
        itemId:this.props.match.params.id,
        error:"",

      };
  }

  
  formRef = React.createRef();


  async componentDidMount() {
    this.geItemBody();
  }



  geItemBody=async ()=>{

    console.log('this is id',this.state.itemId);

    const response = await axios.get(`${ServerIP}/api/v1/provider/items/${this.state.itemId}`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => {
     

      console.log('in then',res)
      this.setState({logo:res.data.logo});

    this.formRef.current.setFieldsValue({
      name: res.data.name,
      summary: res.data.summary,
      price: res.data.price,
      logo:this.state.logo

    });
  
  
    }).catch((err) => {
      console.log('this is error ',err)
      if (err.response)
        this.setState({error: err.response.status})
      else 
      this.setState({error: 500}) 
      
      console.log('this is error status',this.state.error)
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
    axios.put(`${ServerIP}/api/v1/provider/items/edit/${this.state.itemId}`, 
    {
        name:values.name,
        logo:this.state.logo,
        price:values.price,
        summary:values.summary,
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
    console.log('this is values',values);
    

  };
  
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
        

    if(this.state.logo) {
    return (
      <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Edit Item</h2><hr/>
                
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={this.formRef}
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
          
          


          <Form.Item>
              <UploadLogoInput
                  onUploadLogoInputChange={(value) => this.setState({logo:value})}
              />
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
    )}
    


    if(this.state.error){
      console.log('not hello')
  
      return( <ErrorPage err={`${this.state.error}`} />)
  
    }
  
    return false;
    }
}

export default withRouter(EditItem);