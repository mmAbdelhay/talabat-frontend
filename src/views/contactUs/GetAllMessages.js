import { ServerIP } from "../../assets/config";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message, Alert, Card } from "antd";
import "antd/dist/antd.css";
import { checkRole } from "../../services/CheckUserRole";
import { checkIfLoggedIn } from "../../services/CheckUserStatus";

export default function GetAllMessages() {
  const [token, setToken] = useState("");
  const [isSuperUser, setSuperUser] = useState(false);
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(false);

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    const role = checkRole();
    if (loginStatus) setToken(loginToken);
    if (role === "superuser") setSuperUser(true);
  }, []);

  const getAllMessages = () => {
    axios
      .get(`${ServerIP}/api/v1/forms/contactus`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIndex(false);
        setMessages(res.data.Responses);
      })
      .catch((err) => {
        message.error("something went wrong");
      });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={getAllMessages}
        style={{ marginBottom: 10 }}
      >
        get all messages
      </Button>
      {messages.length > 0
        ? messages.map((value, index) => {
            return (
              <Card
                size="small"
                key={index}
                title={`Message from ${value.name}`}
              >
                <p>{value.message}</p>
              </Card>
            );
          })
        : index && <Alert message="you dont have messages yet" type="info" />}
    </>
  );
}
