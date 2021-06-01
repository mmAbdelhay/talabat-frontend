import React from "react";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
export default function Cart() {
   const cartItems = useSelector((state) => state.cart.cart);
   // console.log("CART ITEMS", cartItems);
   return (
      <Card title="Cart" bordered={true} style={{ width: 300 }}>
         {cartItems?.map((item) => {
            return (
               <div key={item?.id}>
                  <p>{item?.name}</p>
                  <p>{item?.quantity}</p>
                  <p>{item?.price}</p>
               </div>
            );
         })}
      </Card>
   );
}
