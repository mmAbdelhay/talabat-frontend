import React,{Component} from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { Form, Input, Button, Checkbox, InputNumber,Select , message } from 'antd';
import UploadLogoInput from "../../sharedComponents/FormInputs/UploadLogoInput";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class EditItemOption extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        itemOptionId:this.props.match.params.id,
      };
  }

  formRef = React.createRef();


  async componentDidMount() {
    this.getItemOption();
  
  }

  getItemOption=async ()=>{
    const response = await axios.get(`${ServerIP}/api/v1/provider/itemoptions/getitemoption/${this.state.itemOptionId}`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });
    
    this.formRef.current.setFieldsValue({
        section_name: response.data.section_name,
        section_type: response.data.section_type,
        
  
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
    axios.put(`${ServerIP}/api/v1/provider/itemoptions/edit/${this.state.itemOptionId}`, 
        {
            section_name: values.section_name,
            section_type: values.section_type,
            
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
                <h2>Edit Item Option</h2><hr/>
                <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                ref={this.formRef}

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

                    <Form.Item label="Section Type" name="section_type"  rules={[
                        {
                            required: true,
                            message: 'Please input section type',
                        },
                        ]}>
                        <Select>
                        
                            <Select.Option value="RadioButton">RadioButton</Select.Option>
                            <Select.Option value="CheckBox">CheckBox</Select.Option>
                            
                        </Select>
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

export default withRouter(EditItemOption);