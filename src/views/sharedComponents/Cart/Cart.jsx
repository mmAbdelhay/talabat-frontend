import React from "react";
import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {removeFromCart } from "../../../routes/cartSlice"
import { MinusOutlined} from "@ant-design/icons";

export default function Cart() {
   const cartItems = useSelector((state) => state.cart.cart);
   const dispatch = useDispatch();
   console.log(cartItems)
   
   return (
      <Card title="Cart" bordered={true} style={{ width: 300 }}>
         <div style={{ display: "flex", justifyContent: "space-between", marginRight:70 }}>
            <p style={{fontWeight: "bold"}}>Name</p>
            <p style={{fontWeight: "bold"}}>Quantity</p>
            <p style={{fontWeight: "bold"}}>Price</p>
         </div>
         {cartItems.length === 0 && (
         <div style={{ display: "flex", justifyContent: "space-between", marginRight:85 }}>
            <p>---</p><p>0</p><p>0</p>
            </div>)}
         {cartItems?.map((item) => {
            return (
               <>
               <div key={item?.id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{item?.name}</p>
                  <p>{item?.quantity}</p>
                  <p>{item?.price}</p>
                  {item?.price > 0 && 
                  (<Button type="primary" size="small" onClick={() => dispatch(removeFromCart(item))}>
                  {<MinusOutlined />}
               </Button>)}
               </div>
               </>
            );
         })}
      </Card>
   );
}


