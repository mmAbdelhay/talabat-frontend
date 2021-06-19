import React, { useState,useEffect } from "react";
import axios from "axios";
import { ServerIP } from "../../assets/config";
import { Card,Button,Avatar,Space,Drawer,Form ,Modal,Select,Table} from "antd";
import { UserOutlined } from '@ant-design/icons';
import CountrySelector from "../sharedComponents/CountrySelector";
import ErrorPage from "../sharedComponents/ErrorPages/ErrorPage";
import MobileInput from "../sharedComponents/FormInputs/MobileInput";
import NameInput from "../sharedComponents/FormInputs/NameInput";
import PasswordInput from "../sharedComponents/FormInputs/PasswordInput";
import EmailInput from "../sharedComponents/FormInputs/EmailInput";
import DateOfBirth from "../sharedComponents/FormInputs/DateOfBirth";
import GenderInput from "../sharedComponents/FormInputs/GenderInput";
import PlacesAutocomplete from "../map/PlacesAutocomplete";
import MapModal from '../map/MapModal';
import Geocode from "react-geocode";

export default function ClientProfile (){
  const { Option } = Select;
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [country, setCountry] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [popup, setPopState] = useState(false);
  const [type, setType] = useState(false);
  const handleModel = () => {
    setPopState(true);

    // you can here render to check out component you have array of items and totalprice in sessiosStorage
 };

  const handleCancel = () => {
    setPopState(false);
 };
 const AddNewLocation=()=>{

  axios
      .post(`${ServerIP}/api/v1/client/info/addnewaddress`,{
        'clientLAt':121.12333 ,
        'clientLng':121.2065 ,
        'type':type
      },{headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      }},)
      .then((res) => {
        console.log(res.data);
        alert(res.data.Message);
        handleCancel();
        window.location.href = "/myprofile";
      })
      .catch((err) => {
        alert("something went wrong 😑 ");
        
        console.log(err.response.status);
      });
  };

 
  const Update = () => {
    // setName()
    // console.log(name);
    console.log(User.client)
    // if (!name){ console.log("true");setName(User.client.name)}
    // if (!email){setEmail(User.client.email)}
    // if (!password){setPassword(User.client.password)}
    // if (!gender){setGender(User.client.gender)}
    // if (!country){setCountry(User.client.country)}
    // if (!dateOfBirth){setDateOfBirth(User.client.dateOfBirth)}
    // if (!mobile){setMobile(User.client.mobile)}
    console.log(name)
    let user = {
      'name': name?name:User.client.name,
      'email': email?email:User.client.email,
      'password': password?password:User.client.password,
      'gender': gender?gender:User.client.gender,
      'country': country?country:User.client.country,
      'mobile': mobile?mobile:User.client.mobile,
      'date_of_birth': dateOfBirth?dateOfBirth:User.client.DateOfBirth,
      'clientLAt':1112.1 ,
      'clientLng':1121.1 ,
      'type':'Home'
    }
    console.log(user)
    axios
      .post(`${ServerIP}/api/v1/client/info/edit`,user,{headers: {
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

  const columns = [
    {
      title: 'type',
      dataIndex: 'address_type',
    },
    {
      title: 'location',
      dataIndex: 'address',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => <> <Button>edit</Button> <Button type="danger">Delete</Button></>,
    },
   
  ];

  
  const [data,setData] = useState(false)
    
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
          setUser(res.data);
          setName(User.client.name);
          setEmail(User.client.email);
          setGender(User.client.gender);
          setDateOfBirth(User.client.DateOfBirth);
          setPassword(User.client.password);
          setCountry(User.client.country);
          setMobile(User.client.mobile);
         

          console.log(res)
        })
        .catch((err) => {
          if (err.response)
            setError(err.response.status)
          else 
            setError(500)
        
        });
      }
    }
  
     useEffect  (()=>{
       getuserData()
       if (User)
       setData (User.client.Client_Addresses.map(function(e) { 
        let obj = {
           address: Geocode.fromLatLng(e.client_latitude,e.client_longitude),
           address_type : e.address_type
         }
        
         return obj;
       }))
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
      <Modal
              title="add new location"
              visible={popup}
              footer={<div
              style={{
                textAlign: 'right',
                }} >
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={AddNewLocation} type="primary">
                Submit
              </Button>
            </div>}
              onCancel={handleCancel}>
              <div className="AppWrapper mt-5 ">
              <Select
                placeholder="Select location type"
                // suffixIcon={<DownCircleTwoTone />}
                // allowClear
                defaultActiveFirstOption
                onChange={(type) => {
                  setType(type);
                }}
              >
                <Option value="Home">Home</Option>
                <Option value="Work">Work</Option>
                <Option value="Other">Other</Option>
              </Select>
              <br/>
              <br/>
                <PlacesAutocomplete />
                <MapModal operation = {"register"}/>
                
              </div>
          </Modal>
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
        <span>Edit Home location : </span>
        <PlacesAutocomplete />
        <MapModal operation = {"register"}/>
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
    
   <Card title="personal information"  extra={<span><Button type="primary" onClick={showDrawer}>Edit</Button><Button type="scoundary" onClick={handleModel}>add new address</Button></span>  }  >
      <p>Email : {User.client.email}</p>
      <p>Mobile : {User.client.mobile}</p>
      <p>Gender : {User.client.gender}</p>
      <p>Country : {User.client.country}</p>
      <p>Date of birth : {User.client.date_of_birth}</p>
      <Table columns={columns} dataSource={data?data:[]} size="middle" />


    </Card>
    </dev> 
    :
    <div>
     <h1>Loading</h1>
    </div>
    )
  }
  if (error){
   return( <ErrorPage err={`${error}`} />)
  }

  return false
}