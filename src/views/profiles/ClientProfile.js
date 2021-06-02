import React, { useState,useEffect } from "react";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { Card,Button,Avatar,Space,Drawer,Form } from "antd";
import { UserOutlined } from '@ant-design/icons';
import CountrySelector from "../sharedComponents/CountrySelector";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";
import MobileInput from "../sharedComponents/FormInputs/MobileInput";
import NameInput from "../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../sharedComponents/FormInputs/EmailInput";
import DateOfBirth from "../sharedComponents/FormInputs/DateOfBirth";
import GenderInput from "../sharedComponents/FormInputs/GenderInput";

export default function ClientProfile (){
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const Update = () => {
    
    axios
      .post(`${ServerIP}/api/v1/client/info/edit`,{
        
        name: name,
        email: email,
        password: password,
        gender: gender,
        country: country,
        mobile: mobile,
        date_of_birth: dateOfBirth,
      },{headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      }},)
      .then((res) => {
        console.log(res.data);
        alert(res.data.Message);
        onClose();
        window.location.href = "/myprofile";
      })
      .catch((err) => {
        alert("something went wrong 😑 ");
        
        console.log(err.response.status);
      });
  };
    const [visible, setVisible] = useState(false);

    const [User,setUser] = useState("")
    const getuserData = ()=> {
      if (!User && !error){
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
          if (err.response)
            setError(err.response.status)
          else 
            setError(500)
          console.log("=============")
        });
      }
    }
      
     useEffect  (()=>{
      getuserData()
    });
    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };
       if (User){
     return  (
       User ?
      
    <dev>
        <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={Update} type="primary">
              Submit
            </Button>
          </div>
        }
        title="Edit account"
          width={620}
      
      >
        <Form name="basic" style={{ width: "70%" }}>
        <NameInput onNameInputChange={(value) => setName(value)} value={`${User.client.name}`} />
        <EmailInput onEmailInputChange={(value) => setEmail(value)} value={`${User.client.email}`}/>
        <PasswordInput onPasswordInputChange={(value) => setPassword(value)} />
        <MobileInput onMobileInputChange={(value) => setMobile(value)}value={`${User.client.mobile}`} />
        <CountrySelector
          onSelectCountry={(value) => {
            setCountry(value.label);
          }}
          value={`${User.client.country}`}
        />
        <DateOfBirth onSelectDateOfBirth={(value) => setDateOfBirth(value) } value={`${User.client.date_of_birth}`} />
        <GenderInput onGenderChange={(value) => setGender(value)} value={`${User.client.gender}`} />
      </Form>
      </Drawer>
     <Space align="center">
    <div>
      <Avatar size="large" icon={<UserOutlined />} />
    </div>
    <div>
      <h2>{User.client.name}</h2>
    </div>
    </Space>
    
   <Card title="personal information"  extra={<Button type="primary" onClick={showDrawer}>Edit</Button>} >
      <p>Email : {User.client.email}</p>
      <p>Mobile : {User.client.mobile}</p>
      <p>Gender : {User.client.gender}</p>
      <p>Country : {User.client.country}</p>
      <p>Date of birth : {User.client.date_of_birth}</p>
    </Card>
    </dev> 
    :
    <dev>
     <h1>Loading</h1>
    </dev>
    )
  }
  if (error){
   return( <ErrorPage err={`${error}`} />)
  }

  return false
}