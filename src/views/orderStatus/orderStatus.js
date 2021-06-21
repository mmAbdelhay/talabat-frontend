import React from 'react';
import "antd/dist/antd.css";
import {  Steps  } from 'antd';
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import {  Button  } from 'antd';
import { ServerIP } from "../../assets/config";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";
const { Step } = Steps;



class OrderStatus extends React.Component{

  constructor(props){
      super(props);
      this.state={
        currentState:0,
        token:localStorage.getItem("token"),
        currentGif:"",
        orderID:this.props.match.params.id,
        error:'',
        serverState:''

      };
  }

  async componentDidMount() {
    this.getStatus();
    console.log(this.props);
  }

  getStatus=async ()=>{
    let states=["Pending", "Preparing", "Ready", "Delivering", "Delivered", "Canceled"]
    const response = await axios.get(`${ServerIP}/api/v1/client/order/status/${this.state.orderID}`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => {
     

      console.log('in then',res)
      
     
    let current=states.indexOf(res.data.orderStatus.order_status)
    console.log(current);
    this.setState({currentState:current,currentGif:res.data.orderStatus.order_status,serverState:"up"})
    console.log(this.props.match.params.id);
  
    }).catch((err) => {
      console.log('this is error ',err)
      if (err.response)
        this.setState({error: err.response.status})
      else 
      this.setState({error: 500}) 
      
      console.log('this is error status',this.state.error)
    });
    
    
    
    
    }

    refresh=()=>{
        this.getStatus();
    }


  render(){
      
       if(this.state.serverState==='up'){
       return (
        <div>
        <Button type="primary" onClick={this.refresh}>Refresh</Button>
        <div>
            <div style={{width:"fit-content",margin:"auto",height:"400px"}}>
                {this.state.currentGif?<img src={`${ServerIP}/orderstatus/images/${this.state.currentGif}.gif`} alt="loading..." style={{width:"400px"}} className="mx-auto"/>:"LOADING..."}
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
          
       )};


       if(this.state.error){
        console.log('not hello')
    
        return( <ErrorPage err={`${this.state.error}`} />)
    
      }
    
      return false;
  }
}

export default OrderStatus;