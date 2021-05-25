import { ServerIP } from "../../../assets/config";
import React, {useState} from "react";
import axios from "axios";
import { Form, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

export default function LoginForm (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const login = () => {
        console.log(email, password, role)
        axios.post(`${ServerIP}/api/v1/${role}/authenticate/login`, {
            email: email,
            password: password
        }).then(res => {
            console.log(res, res.data.token);
            alert(res.data.Message)
        }).catch(err => {
            console.log(err)
        });
        
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    
    return (
        <>
                
        <Form
      name="basic"
      initialValues={{
        remember: true
      }}
      onFinishFailed={onFinishFailed}
        >
      <Form.Item
        label="Email"
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
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
        <Input.Password />
      </Form.Item>
      <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'please select your role'
            },
          ]}

        >
          <Select
            placeholder="Select a option and change input text above"
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
        <Button type="primary" htmlType="submit" onClick={login}>
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
    );
}
