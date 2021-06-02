import React, { useState, useEffect } from "react";
import Collapsible from "./Collapsible_menu";
import { Collapse, Card } from "antd";
import ItemComponent from "./ItemComponent";
const { Panel } = Collapse;
export default function CollapsibleMenu(props) {
  const [providerInformation, setProviderInformation] = useState();
  useEffect(() => {
    setProviderInformation(props?.providerInformation);
  }, [props]);
  return (
    <div style={{ display: "flex" }}>
      <Card
        title="Categories"
        bordered={true}
        style={{ width: 200, marginRight: "1em", marginLeft: "2em" }}
      >
        {providerInformation?.Categories?.map((catItem) => {
          return (
            <p key={catItem?.id}>
              {catItem?.name}
              <hr />
            </p>
          );
        })}
      </Card>
      <Collapse
        // defaultActiveKey={["1", "2", "3"]}
        style={{
          width: "30em",
          marginRight: "2em",
        }}
      >
        {providerInformation?.Categories?.map((catItem) => {
          return (
            <Panel header={catItem?.name} key={catItem?.id}>
              <p>
                {catItem?.Items?.map((item) => {
                  if (item?.availability) {
                    return (
                      <>
                        <ItemComponent
                          item={item}
                          key={item?.id}
                          providerId={providerInformation.id}
                        />
                        <hr />
                      </>
                    );
                  }
                })}
              </p>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
