import React, { Component } from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox,message } from 'antd';
import { withRouter } from "react-router-dom";
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";



class EditCategory extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        categoryName:  '',
        categoryId:this.props.match.params.id,
        error:"",

      };
  }

  formRef = React.createRef();


async componentDidMount() {
    this.getCategoryName();

    
}



getCategoryName=async ()=>{
  const response = await axios.get(`${ServerIP}/api/v1/provider/categories/${this.state.categoryId}`, {
      headers:{
          Authorization: `Token ${this.state.token}`,
      }
  }).then((res) => {
     

    console.log('in then',res)
    this.setState({
      categoryName:res.data.name,
    },()=>console.log(this.state.categoryName))
  
  
    this.formRef.current.setFieldsValue({
      name: this.state.categoryName,
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
        console.log('Success:', values);
        console.log(this.state.token);
        axios.put(`${ServerIP}/api/v1/provider/categories/edit/${this.state.categoryId}`, 
            values,
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



      console.log('this is id',this.props.match.params.id);

      if(this.state.categoryName){



      
       return (

        <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Edit Category</h2><hr/>
      

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
                        
                        <Input  />
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

  return false
  ;
  }
}

export default withRouter(EditCategory);
