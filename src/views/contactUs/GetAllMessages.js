import { ServerIP } from "../../assets/config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Alert, Card } from "antd";
import "antd/dist/antd.css";
import { checkRole } from "../../services/CheckUserRole";
import { checkIfLoggedIn } from "../../services/CheckUserStatus";
import { Link } from "react-router-dom";

export default function GetAllMessages() {
  const [token, setToken] = useState("");
  const [isSuperUser, setSuperUser] = useState(false);
  const [messages, setMessages] = useState([]);

  const getAllMessages = async (token) => {
    let response = await axios.get(`${ServerIP}/api/v1/forms/contactus`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response.status === 200) {
      setMessages(response.data?.Responses);
    } else {
      return false;
    }
  };

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    const role = checkRole();
    if (loginStatus) setToken(loginToken);
    if (role === "superuser") setSuperUser(true);
  }, []);

  useEffect(() => {
    getAllMessages(token);
  }, [token]);

  return (
    <div>
      {messages.length > 0 ? (
        messages.map((value, index) => {
          return (
            <Card size="small" key={index} title={`Message from ${value.name}`}>
              <p>{value.message}</p>
            </Card>
          );
        })
      ) : (
        <Alert message="you dont have messages yet" type="info" />
      )}
      <Link to="/">
        <Button type="primary" style={{ float: "right", margin: "10px" }}>
          go back
        </Button>
      </Link>
    </div>
  );
}
