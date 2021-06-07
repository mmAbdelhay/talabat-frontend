import React from 'react';
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Tag, Space } from 'antd';
import {  Button  } from 'antd';

class UnApprovedProviders extends React.Component{

  constructor(props){
      super(props);
      this.state={
          unApproved:[],
          token:localStorage.getItem("token"),
          // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5OTNhZjNhNy01ZmE4LTQ4ZDgtOWFlNS1lZTJhOWU3ZjUyOWQiLCJfcm9sZSI6IlN1cGVyIFVzZXIiLCJpYXQiOjE2MjI2NTY5MTEsImV4cCI6MTYyMjcwMDExMX0.XBCWZjsYpJR5eVDHY3G7DCsHQsDPlhhLabHEPS_Tfjw'
      };
  }

  async componentDidMount() {
    this.getUnapproved();
  }

  getUnapproved=async ()=>{
    const response = await axios.get("http://localhost:5000/api/v1/superuser/unapproved/providers", {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    });
    this.setState({unApproved:response.data.All_Unapproved})
    console.log(response.data);
    }

  approve=(e,record)=>{
      axios.put(`http://localhost:5000/api/v1/superuser/unapproved/providers/approve/${record.id}`,{},{
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then( (response)=>{
            console.log("in then",response.data);
            this.getUnapproved();
        }).catch((error)=>{
            alert(error);
        });
  }

  decline=(e,record)=>{
    axios.delete(`http://localhost:5000/api/v1/superuser/delete/provider/${record.id}`,{
          headers: {
              'Authorization': `Token ${this.state.token}`
          }
      },{}).then( (response)=>{
          console.log("in then",response.data);
          this.getUnapproved();
      }).catch((error)=>{
          alert(error);
      });
    
}

  render(){
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Provider Type',
          dataIndex: 'provider_type',
          key: 'provider_type',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={(e)=>this.approve(e,record)}>Approve</Button>
              <Button type="primary" danger onClick={(e)=>this.decline(e,record)}>Decline</Button>
            </Space>
          ),
        },
      ];
      
      const data = this.state.unApproved;
      
       return (
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
       );
  }
}

export default UnApprovedProviders;