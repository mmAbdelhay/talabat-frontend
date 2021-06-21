import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";





class Orders extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        orders:[],
        error:''

      };
  }

  async componentDidMount() {
    this.getOrders();
  }

  getOrders=async ()=>{

    const response = await axios.get(`${ServerIP}/api/v1/client/info/allorders`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => {
     

      console.log('in then',res)
      
      this.setState({
          orders:res.data,
      },()=>console.log('hello',this.state.orders))

      console.log('hello orders',this.state.orders)
  
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
        const IconText = ({ icon, text }) => (
          <Space>
            {React.createElement(icon)}
            {text}
          </Space>
        );

       if(this.state.orders.length>0){ 
       return (
        <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={this.state.orders}
        
        renderItem={item => (
          <Link to={item.order_status==`Delivered`?`/review/provider/${item.Provider.name}/${item.Provider.id}`:`/orderStatus/${item.id}`} >
          <List.Item
            key={item.id}
            extra={
              <img
                width={272}
                alt="logo"
                src={`${ServerIP}${item.Provider.logo}`}
              />
            }
          >
            <List.Item.Meta
              title={`Order ${item.id}`}
            />
            {`Total Price : ${item.total_price}`}
            <br/><br/>
            {`Date : ${item.createdAt.substr(0,10)} at ${item.createdAt.substr(12,4)}`}
          </List.Item>
          </Link>
        )}
      />
       )};
    
    
    if(this.state.error){
      console.log('not hello')
  
      return( <ErrorPage err={`${this.state.error}`} />)
  
    }
  
    return false;
  }
}

export default Orders;