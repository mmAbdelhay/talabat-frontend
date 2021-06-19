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

export default function ProviderProfile(props) {
   const [providerInformation, setProviderInformation] = useState({});

   useEffect(async () => {
      const returnedInformation = await getProviderInfo("484d01f4-b6ad-4491-b81e-c660e3165ea2");
      setProviderInformation(returnedInformation?.data?.Provider);
      console.log(providerInformation);
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
         <br />
         <br />
      </div>
   );
}
