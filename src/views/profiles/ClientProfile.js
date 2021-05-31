import React, { useState } from "react";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { message,Card,Table,Divider,Avatar,Space } from "antd";
import { UserOutlined } from '@ant-design/icons';


export default function ClientProfile (){
    const columns = [
        {
          title: 'total_price',
          dataIndex: 'total_price',
          key: 'total_price',
        },
        {
          title: 'order_status',
          dataIndex: 'order_status',
          key: 'order_status',
        },
        {
          title: 'driver_id',
          dataIndex: 'driver_id',
          key: 'driver_id',
        },
      ];
    const [User,setUser] = useState(()=>{
        axios
        .get(`${ServerIP}/api/v1/client/info`, {
          headers: {
              Authorization: 'Token ' + localStorage.getItem("token")
            }
        })
        .then((res) => {
          setUser(res.data)
          console.log(res.data.client.name)
        })
        .catch((err) => {
          console.log(err)
          message.error("error");
        });
    });
       
     return  (User ?

    <>
     <Space align="center">
    <div>
      <Avatar size="large" icon={<UserOutlined />} />
    </div>
    <div>
      <h2>{User.client.name}</h2>
    </div>
    </Space>
    
   {/* <Card title={`${User.client.name}`} > */}
   <Card title="personal information" >
      <p>Email : {User.client.email}</p>
      <p>Mobile : {User.client.mobile}</p>
      <p>Gender : {User.client.gender}</p>
      <p>Country : {User.client.country}</p>
      <p>Date of birth : {User.client.date_of_birth}</p>
    </Card>
  
    <Divider />
  
    <Card title="Orders" >
      <Table dataSource={User.orders} columns={columns} />
    </Card>

    </> 
    :
    <>
     <h1>Loading</h1>
    </>
    )
}