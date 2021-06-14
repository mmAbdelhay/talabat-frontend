import React from 'react';
import "antd/dist/antd.css";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";





class Orders extends React.Component{

  constructor(props){
      super(props);
      this.state={
        token:localStorage.getItem("token"),
        orders:[],
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
    });
    this.setState({
        orders:response.data,
    },()=>console.log(this.state.orders))
  }

  render(){
        const IconText = ({ icon, text }) => (
          <Space>
            {React.createElement(icon)}
            {text}
          </Space>
        );
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
          <Link to={`/orderStatus/${item.order_status}`} >
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
       );
  }
}

export default Orders;