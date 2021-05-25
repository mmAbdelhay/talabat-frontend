import { ServerIP } from "../../../assets/config";
import React, {useState} from "react";
import axios from "axios";
import { Form, Input, Button, Select, Typography} from 'antd';
import { UnlockOutlined, UserOutlined, DownCircleTwoTone } from "@ant-design/icons";
import 'antd/dist/antd.css';

const { Option } = Select;
const { Title } = Typography;

export default function SignUpForm (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const login = () => {
        axios.post(`${ServerIP}/api/v1/${role}/authenticate/signup`, {
            email: email,
            password: password
        }).then(res => {
            console.log(res, res.data.token);
            alert(res.data.Message)
        }).catch(err => {
            console.log(err)
        });        
    }
    
    return (
        <>
            <Title level={5}>Signup page</Title>   
        <Form
      name="basic" shouldUpdate
      initialValues={{
        remember: true
      }}
        >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!'
          },{
            type: 'email', 
            message: 'The input is not valid E-mail!', 
          }
        ]}
        onChange={e=>{
            setEmail(e.target.value)
        }}
      >
        <Input prefix={<UserOutlined />} placeholder='Email'/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!'
          },{
              min: 6,
              message: 'password should be 6 characters or more'
          }
        ]}
        onChange={e=>{
            setPassword(e.target.value)
        }}
      >
        <Input.Password  prefix={<UnlockOutlined />} placeholder="Password"/>
      </Form.Item>
      <Form.Item
          name="role"
          rules={[
            {
              required: true,
              message: 'please select your role'
            },
          ]}
        >
          <Select
            placeholder="Select your role"
            suffixIcon={<DownCircleTwoTone />}
            allowClear
            onChange={role=>{
                setRole(role)
            }}
          >
            <Option value="client">Client</Option>
            <Option value="provider">Provider</Option>
            <Option value="superuser">Superuser</Option>
          </Select>
        </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" onClick={login} >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
    );
}
