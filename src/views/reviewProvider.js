import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../assets/config";
import { Form, Input, Button, Checkbox , message} from 'antd';



class ReviewProvider extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        providerName:this.props.match.params.prov_name,
        providerID:this.props.match.params.prov_id
      };
  }

  async componentDidMount() {
    console.log(this.props);
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
        axios.post(`${ServerIP}/api/v1/client/order/review/add/${this.state.providerID}`, 
            values,
            {headers: {
                Authorization: `Token ${this.state.token}`,
            }}
        ).then((res)=>{
          message.success(`${res.data.Message}`);
        });
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

       return (

        <div className="container">
          <div className="row">
            <div className="col"></div>
  
  
  
            <div className="col-10 bg-success shadow-sm p-3 mb-5 bg-white ">
                <h2>Review {this.state.providerName}</h2><hr/>
      

                    <Form
                      {...layout}
                      name="basic"
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                        <Form.Item name="content" label="Review" 
                            rules={[
                            {
                                required: true,
                                message: 'Please input content name',
                            },
                            ]}>
                            <Input.TextArea />
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

export default ReviewProvider;