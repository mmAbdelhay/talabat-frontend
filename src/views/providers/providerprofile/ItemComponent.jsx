import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, defineProviderId } from "../../../routes/cartSlice";
import menu_item from "../../../assets/imgs/menu_item.png";
import { ServerIP } from "../../../assets/config";
// import { PlusOutlined } from "@ant-design/icons";
// import { SearchOutlined } from "@ant-design/icons";
export default function ItemComponent(props) {
  const dispatch = useDispatch();
  const [item, setItem] = useState();
  useEffect(() => {
    setItem(props?.item);
  }, [props]);
  const saveDispatcherState = () => {
    const itemToBeSaved = {
      name: item.name,
      id: item.id,
      quantity: 1,
      price: item.price,
      itemPrice: item.price,
    };
    dispatch(defineProviderId(props?.providerId));
    dispatch(addToCart(itemToBeSaved));
  };

  const addDefaultSrc = (event) => {
    event.target.src = menu_item;
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {item?.logo && (
            <img
              style={{ width: 50, height: 50, marginTop: 10 }}
              onError={addDefaultSrc}
              src={`${ServerIP}${item?.logo}`}
              alt="menu_item"
            />
          )}
        </div>
        <div style={{ marginLeft: 15, marginRight: "auto" }}>
          <p>{item?.name}</p>
          <p>{item?.summary}</p>
        </div>
        <Tooltip title="Add to Cart">
          <Button type="primary" onClick={() => saveDispatcherState()}>
            Add to Cart
          </Button>
        </Tooltip>
      </div>
    </>
  );
}
