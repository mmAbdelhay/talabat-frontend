import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, defineProviderId } from "../../../routes/cartSlice";
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
      };
      dispatch(defineProviderId(props?.providerId));
      dispatch(addToCart(itemToBeSaved));
   };
   return (
      <>
         <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
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
