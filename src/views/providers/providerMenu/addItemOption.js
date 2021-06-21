import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import { Redirect } from "react-router-dom";
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";

class AddItemOption extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        categories:[],
        items:[],
        submitted:false,
        error:''

      };
  }

  async componentDidMount() {
    this.getCategories();
    this.setState({
        submitted:false
    })
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
    axios.post(`${ServerIP}/api/v1/provider/itemoptions/add`, 
        {
            section_name: values.section_name,
            section_type: values.section_type,
            item_id:values.item_id,
        },
        {headers: {
            Authorization: `Token ${this.state.token}`,
        }}
    );

    this.setState({submitted:true});
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
          {this.state.submitted? <Redirect to="/additionaloption"/> : ""}
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Add Item Option</h2><hr/>
                <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Section name"
                        name="section_name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input section name',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Section Type" name="section_type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select type',
                        },
                        ]}>
                        <Select>
                        
                            <Select.Option key="1" value="RadioButton">RadioButton</Select.Option>
                            <Select.Option key="2" value="CheckBox">CheckBox</Select.Option>
                            
                        </Select>
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
                        <Select>
                        {this.state.items.map(item=>{
                            console.log("item",item);
                            return(
                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            )
                        })}
                        </Select>
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

export default AddItemOption;