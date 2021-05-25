import React, { useState } from "react";
import { Tabs, Typography } from "antd";
import { UserOutlined, DingdingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import ClientSignUp from "./signUpForms/ClientSignUp";

const { TabPane } = Tabs;
const { Title } = Typography;

export default function SignUpTabs() {
  return (
    <div>
      <Title level={5}> Signup page </Title>{" "}
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Client{" "}
            </span>
          }
          key="1"
        >
          <ClientSignUp />
        </TabPane>{" "}
        <TabPane
          tab={
            <span>
              <DingdingOutlined />
              Provider{" "}
            </span>
          }
          key="2"
        >
          Tab 2{" "}
        </TabPane>{" "}
      </Tabs>{" "}
    </div>
  );
}
