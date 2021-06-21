import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";

class AdditionalOption extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        categories:[],
        items:[],
        itemOptions:[],
        error:''

      };
  }

  formRef = React.createRef()

  async componentDidMount() {
    this.getCategories();
  }

  getCategories=async ()=>{
    const response = await axios.get(`${ServerIP}/api/v1/provider/categories/getall`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => {
     

        console.log('in then',res)
        
    this.setState({
        categories:res.data,
    },()=>console.log(this.state.categories))
        
    
      }).catch((err) => {
        console.log('this is error ',err)
        if (err.response)
          this.setState({error: err.response.status})
        else 
        this.setState({error: 500}) 
        
        console.log('this is error status',this.state.error)
      });



  }

  getCategoryItems =async (value)=>{
    console.log("in report",value);
    const response = await axios.get(`${ServerIP}/api/v1/provider/items/getcategoryitems/${value}`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });
    this.setState({
        items:response.data,
    },()=>console.log(this.state.items))
    }

    
    getItemOptions =async (value)=>{
        console.log("in ge titem options",value);
        const response = await axios.get(`${ServerIP}/api/v1/provider/itemoptions/getitemoptions/${value}`, {
            headers:{
                Authorization: `Token ${this.state.token}`,
            }
        });
        this.setState({
            itemOptions:response.data,
        },()=>console.log(this.state.items))
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
        axios.post(`${ServerIP}/api/v1/provider/itemadditionaloptions/add`, 
        {
            option_name: values.option_name,
            additional_price: values.additional_price,
            item_option_id:values.item_option_id
        },
        {headers: {
            Authorization: `Token ${this.state.token}`,
        }}
    ).then((res) => {
        message.success(`${res.data['Message']}`);
        this.formRef.current.setFieldsValue({
          option_name: "",
          additional_price:"",
          item_option_id:undefined,
          category_id:undefined,
          item_id:undefined
        });
      })
      .catch((res) => {
        message.error(`${res.data['Message']}`);
      });
  };
  
  const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
  };
   
  let report = (value)=>{
      console.log("in report",value);
  }
  if(this.state.categories.length>0){
    return (
      <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Add Additional Option</h2><hr/>
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      ref={this.formRef}
      >
          <Form.Item
              label="Option name"
              name="option_name"
              rules={[
              {
                  required: true,
                  message: 'Please input option',
              },
              ]}
          >
              <Input />
          </Form.Item>

          <Form.Item label="Category" name="category_id"
          rules={[
            {
                required: true,
                message: 'Please select category',
            },
            ]}>
              <Select onChange={(value)=>this.getCategoryItems(value)}>
              {this.state.categories.map(category=>{
                  return(
                  <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                  )
              })}
              </Select>
          </Form.Item>

          <Form.Item label="Item" name="item_id"
          rules={[
            {
                required: true,
                message: 'Please select item',
            },
            ]}>
              <Select onChange={(value)=>this.getItemOptions(value)}>
              {this.state.items.map(item=>{
                  console.log("item",item);
                  return(
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  )
              })}
              </Select>
          </Form.Item>

          <Form.Item label="Item Option" name="item_option_id"
          rules={[
            {
                required: true,
                message: 'Please select item option',
            },
            ]}>
              <Select>
              {this.state.itemOptions.map(item_option=>{
                  console.log("item option",item_option);
                  return(
                  <Select.Option key={item_option.id} value={item_option.id}>{item_option.section_name}</Select.Option>
                  )
              })}
              </Select>
          </Form.Item>

      <Form.Item label="Additional Price"
      rules={[
        {
            required: true,
            message: 'Please add price',
        },
        ]}>
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
              Create
              </Button>
          </Form.Item>
      </Form>

      </div>

      <div className="col"></div>

      </div>
      </div>
    )};
    
    
    if(this.state.error){
      console.log('not hello')
  
      return( <ErrorPage err={`${this.state.error}`} />)
  
    }
  
    return false;
    
    

    }
}

export default AdditionalOption;