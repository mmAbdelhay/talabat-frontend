import React, { useEffect, useState } from "react";
import styles from "./providerProfile.module.css";
import { getProviderInfo } from "../../../services/getProviderInfo";
import { Tabs, Card } from "antd";
import UpperInfo from "./upper_info";
import Collapsible from "./Collapsible_menu";
import Cart from "../../sharedComponents/Cart/Cart";
import { MenuOutlined, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default function ProviderProfile() {
   const [providerInformation, setProviderInformation] = useState({});

   useEffect(async () => {
      const returnedInformation = await getProviderInfo("abbdab3a-6ef8-4e11-83a9-3697c63f2289");
      setProviderInformation(returnedInformation?.data?.Provider);
      // console.log(returnedInformation);
   }, []);

   return (
      <div className={styles.main_page}>
         <UpperInfo providerInformation={providerInformation} />
         <div style={{ display: "flex" }}>
            <Tabs size="large" tabBarGutter={170} defaultActiveKey="1">
               <TabPane
                  style={{ width: "auto" }}
                  key="1"
                  tab={
                     <span>
                        <MenuOutlined /> Menu
                     </span>
                  }>
                  <Collapsible providerInformation={providerInformation} />
               </TabPane>
               <TabPane
                  key="2"
                  tab={
                     <span>
                        <QuestionCircleOutlined /> Reviews
                     </span>
                  }>
                  Reviews Tab
               </TabPane>
               <TabPane
                  key="3"
                  tab={
                     <span>
                        <InfoCircleOutlined /> Info
                     </span>
                  }>
                  Provider Extra Info Tab
               </TabPane>
            </Tabs>
            <div className={styles.cart_card}>
               <Cart />
            </div>
         </div>
      </div>
   );
}
