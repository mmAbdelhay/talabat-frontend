import React, { useEffect, useState } from "react";
import styles from "./providerProfile.module.css";
import { getProviderInfo } from "../../../services/getProviderInfo";
import { Tabs, Card } from "antd";
import { Collapse } from "antd";
const { Panel } = Collapse;

const { TabPane } = Tabs;

export default function ProviderProfile() {
   const [providerInformation, setProviderInformation] = useState({});

   useEffect(async () => {
      const returnedInformation = await getProviderInfo("abbdab3a-6ef8-4e11-83a9-3697c63f2289");
      setProviderInformation(returnedInformation?.data?.Provider);
      console.log(returnedInformation);
   }, []);

   return (
      <div className={styles.main_page}>
         <div className={styles.upper_info}>
            <div className={styles.provider_logo_holder}>
               <img
                  className={styles.provider_logo}
                  src="http://localhost:5000/providers/images/KFC.png"
                  alt="logo"
               />
            </div>
            <div className={styles.provider_information_holder}>
               <h1>{providerInformation.name}</h1>
               <p>{providerInformation.formatted_address}</p>
               <p>Min. Order: {providerInformation.minimum_order}</p>
               <p>Delivery fee: {providerInformation.delivery_fee}</p>
            </div>
         </div>

         <div style={{ display: "flex" }}>
            <Tabs size="large" tabBarGutter={200} defaultActiveKey="1">
               <TabPane style={{ width: "auto" }} tab="Menu" key="1">
                  <div style={{ display: "flex" }}>
                     <Card
                        title="Categories"
                        bordered={true}
                        style={{ width: 200, marginRight: "2em" }}>
                        <p>For each array filled</p>
                     </Card>
                     <Collapse
                        defaultActiveKey={["1", "2", "3"]}
                        style={{
                           width: "30em",
                           marginRight: "2em",
                        }}>
                        <Panel header="This is panel header 1" key="1">
                           <p>1</p>
                        </Panel>
                        <Panel header="This is panel header 2" key="2">
                           <p>2</p>
                        </Panel>
                        <Panel header="This is panel header 3" key="3">
                           <p>3</p>
                        </Panel>
                     </Collapse>
                  </div>
               </TabPane>
               <TabPane tab="Reviews" key="2">
                  Content of Tab Pane 2
               </TabPane>
               <TabPane tab="Info" key="3">
                  Content of Tab Pane 3
               </TabPane>
            </Tabs>
            <div className={styles.cart_card}>
               <Card title="Cart" bordered={true} style={{ width: 300 }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
               </Card>
            </div>
         </div>
      </div>
   );
}
