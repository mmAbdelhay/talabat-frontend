import React from 'react';
import axios from "axios";
import "antd/dist/antd.css";
import { Table, Tag, Space } from 'antd';
import {  Button  } from 'antd';
import { ServerIP } from "../../../assets/config";
import ErrorPage from "../../sharedComponents/ErrorPages/ErrorPage";

class UnApprovedProviders extends React.Component{

  constructor(props){
      super(props);
      this.state={
          unApproved:[],
          token:localStorage.getItem("token"),
          error:'',
          serverState:''
          // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5OTNhZjNhNy01ZmE4LTQ4ZDgtOWFlNS1lZTJhOWU3ZjUyOWQiLCJfcm9sZSI6IlN1cGVyIFVzZXIiLCJpYXQiOjE2MjI2NTY5MTEsImV4cCI6MTYyMjcwMDExMX0.XBCWZjsYpJR5eVDHY3G7DCsHQsDPlhhLabHEPS_Tfjw'
      };
  }

  async componentDidMount() {
    this.getUnapproved();
  }

  getUnapproved=async ()=>{
    const response = await axios.get(`${ ServerIP }/api/v1/superuser/unapproved/providers`, {
        headers:{
            Authorization: `Token ${this.state.token}`,
        }
    }).then((res) => {
     

      console.log('in then',res)
      
     
      this.setState({unApproved:res.data.All_Unapproved,serverState:'up'})
      console.log(res.data);
  
    }).catch((err) => {
      console.log('this is error ',err)
      if (err.response)
        this.setState({error: err.response.status})
      else 
      this.setState({error: 500}) 
      
      console.log('this is error status',this.state.error)
    });





    }

  approve=(e,record)=>{
      axios.put(`${ ServerIP }/api/v1/superuser/unapproved/providers/approve/${record.id}`,{},{
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
    axios.delete(`${ ServerIP }/api/v1/superuser/delete/provider/${record.id}`,{
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
      if(this.state.serverState==='up'){
       return (
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
       )};

       if(this.state.error){
        console.log('not hello')
    
        return( <ErrorPage err={`${this.state.error}`} />)
    
      }
    
      return false;
  }
}

export default UnApprovedProviders;