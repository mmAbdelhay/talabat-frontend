import React from 'react';
import "antd/dist/antd.css";
import {  Steps  } from 'antd';
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import {  Button  } from 'antd';
const { Step } = Steps;
import { ServerIP } from "../../assets/config";



class OrderStatus extends React.Component{

  constructor(props){
      super(props);
      this.state={
        currentState:0,
        token:localStorage.getItem("token"),
        currentGif:"",
      };
  }

  async componentDidMount() {
    this.getStatus();
  }

  getStatus=async ()=>{
    let states=["Pending", "Preparing", "Ready", "Delivering", "Delivered", "Canceled"]
    const response = await axios.get(`${ServerIP}/api/v1/client/order/status/5`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });
    let current=states.indexOf(response.data.orderStatus.order_status)
    console.log(current);
    this.setState({currentState:current,currentGif:response.data.orderStatus.order_status})
    console.log(response.data.orderStatus.order_status);
    }

    refresh=()=>{
        this.getStatus();
    }


  render(){
      
       return (
        <div>
        <Button type="primary" onClick={this.refresh}>Refresh</Button>
        <div>
            <div style={{width:"fit-content",margin:"auto",height:"400px"}}>
                <img src={`${ServerIP}/orderstatus/images/${this.state.currentGif}.gif`} alt="loading..." style={{width:"400px"}} className="mx-auto"/>
            </div>
        </div>
        <Steps current={this.state.currentState} style={{marginTop:"50px"}}>
            <Step title="Pending" description="Waiting for restaurant to approve order."  icon={this.state.currentState==0? <LoadingOutlined />:""}/>
            <Step title="Preparing" description="Order is being prepared." icon={this.state.currentState==1? <LoadingOutlined />:""}/>
            <Step title="Ready" description="Order is ready for delivering." icon={this.state.currentState==2? <LoadingOutlined />:""}/>
            <Step title="Delivering" description="Order is on its way." icon={this.state.currentState==3? <LoadingOutlined />:""}/>
            <Step title="Delivered" description="Order is delivered." icon={this.state.currentState==4? <LoadingOutlined />:""}/>
        </Steps>
        </div>
          
       );
  }
}

export default OrderStatus;