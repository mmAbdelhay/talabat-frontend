import React from "react";
import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {removeFromCart } from "../../../routes/cartSlice"
export default function Cart() {
   const cartItems = useSelector((state) => state.cart.cart);
const dispatch = useDispatch();
   return (
      <Card title="Cart" bordered={true} style={{ width: 300 }}>
         {cartItems?.map((item) => {
            return (
               <div key={item?.id}>
                  <p>{item?.name}</p>
                  <p>{item?.quantity}</p>
                  <p>{item?.price}</p>
                  {item?.price > 0 && (<Button type="primary" onClick={() => dispatch(removeFromCart(item))}>
                  remove from cart
               </Button>)}
               </div>
            );
         })}
      </Card>
   );
}
