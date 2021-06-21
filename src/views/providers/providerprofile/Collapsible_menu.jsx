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
            <div key={catItem?.id}>
              <p>{catItem?.name}</p>
              <hr />
            </div>
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
            <Panel key={catItem?.id} header={catItem?.name}>
              <div>
                {catItem?.Items?.map((item) => {
                  if (item?.availability) {
                    return (
                      <div key={item?.id}>
                        <ItemComponent
                          item={item}
                          providerId={providerInformation.id}
                        />
                        <hr />
                      </div>
                    );
                  }
                })}
              </div>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}
