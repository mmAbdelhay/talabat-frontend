import React, { useState, useEffect } from "react";
import { Card, Button, Modal , Input} from "antd";
import axios from "axios";
import { ServerIP } from "../../../assets/config";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../routes/cartSlice";
import { MinusOutlined, RightOutlined } from "@ant-design/icons";
import { checkIfLoggedIn } from "../../../services/CheckUserStatus";
import { checkRole } from "../../../services/CheckUserRole";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutForm from "./stripe";
import ELEMENTS_OPTIONS from "./stripe";
export default function Cart() {
   const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
   const cartItems = useSelector((state) => state.cart.cart);
   const dispatch = useDispatch();
   const [popup, setPopState] = useState(false);
   const [totalprice, setTotalprice] = useState(0);
   const [cartElementss, setCartElements] = useState(sessionStorage.getItem('cart'));
   const [ProvIDs, setProvID] = useState(sessionStorage.getItem('providerId'));
   const [totals, setTotalPrice] = useState(sessionStorage.getItem('totalprice'));
   useEffect(() => {
      const [loginStatus, loginToken] = checkIfLoggedIn();
      const role = checkRole();
      if (loginStatus && role === "client") setIsClientLoggedIn(true);
   }, []);

   useEffect(() => {
      let total = 0;
      cartItems?.map((item) => {
         total += +item.price;
      });
      setTotalprice(total);
   }, [cartItems]);
   const stripePromise = loadStripe(
      "pk_test_51IylsfFbv4bq3gHEGu377QH9EZEm3dJzg1KEtB1wxb1ifEECvujcbHtxMOvc74fO9lNAAIFOCqF1ySZXEfmAc09J00UtkrLyEI"
   );
   const removeCoupon = ()=>{
      sessionStorage.removeItem("discount");
   }
   const handleVisa = () => {
      console.log("ddddddddddddddddddddddddd");
      sessionStorage.setItem("totalprice", totalprice);
     
      setPopState(true);

      // you can here render to check out component you have array of items and totalprice in sessiosStorage
   };
   const checkCoupon = ()=>{
      if (sessionStorage.getItem('coupon'))
      axios
      .post(`${ServerIP}/API/V1/orders/CreateOrder/checkCoupon`,{
      
        coupon: sessionStorage.getItem('coupon')
      },)
      .then((res) => {
         console.log(res.data.checkCoupon.discount_percentage)
         sessionStorage.setItem('discount',res.data.checkCoupon.discount_percentage)
         setTotalprice(totalprice-sessionStorage.getItem('discount'))

         // alert(totalprice);
       
      })
      .catch((err) => {
        alert("code not valid"+err);
      
      })
     



   }
   const  OrderCreation= () =>{
      axios
      .post(`${ServerIP}/API/V1/orders/CreateOrder/create`,{
        
        cart : cartElementss,
        provider_id : ProvIDs,
        total_price: totals,
        lat: sessionStorage.getItem('nearlat'),
        lng: sessionStorage.getItem('nearlng'), 
      //   lat : 10,
      //   lng : 10,
        paymentMethod: "cash",
        notes: sessionStorage.getItem('notes'),
        coupon: sessionStorage.getItem('coupon')?sessionStorage.getItem('coupon'):0
      },
      {headers: {
        Authorization: 'Token ' + localStorage.getItem("token")
      }
    },)
      .then((res) => {
        console.log(res.data);
        sessionStorage.removeItem('cart');
        window.location.href = '/';
      })
      .catch((err) => {
        alert("something went wrong 😑 ");
        
        console.log(err.response.status);
      });
  };
   const handleCash = () => {
      sessionStorage.setItem("totalprice", totalprice);
      // console.log("aaaaaaaaaaa");
      OrderCreation();
   };
   const savenotes = (e) => {
   
      sessionStorage.setItem("notes",e.target.value);
      
   }
   const saveCoupon = (e) => {
      e.target.value?
      sessionStorage.setItem("coupon",e.target.value):
      sessionStorage.removeItem("coupon");
   }
   const handleCancel = () => {
      setPopState(false);
   };

   if (isClientLoggedIn) {
      return (
         <Card title="Cart" bordered={true} style={{ width: 300 }}>
            <div
               style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: 70,
               }}>
               <p style={{ fontWeight: "bold" }}>Name</p>
               <p style={{ fontWeight: "bold" }}>Quantity</p>
               <p style={{ fontWeight: "bold" }}>Price</p>
            </div>
            {cartItems.length === 0 && (
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     marginRight: 85,
                  }}>
                  <p>---</p>
                  <p>0</p>
                  <p>0</p>
               </div>
            )}
            {cartItems?.map((item) => {
               return (
                  <>
                     <div
                        key={item?.id}
                        style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{item?.name}</p>
                        <p>{item?.quantity}</p>
                        <p>{item?.price}</p>
                        {item?.price > 0 && (
                           <Button
                              type="danger"
                              size="small"
                              onClick={() => dispatch(removeFromCart(item))}>
                              {<MinusOutlined />}
                           </Button>
                        )}
                     </div>
                  </>
               );
            })}
            {totalprice > 0 && (
               <>
                  <Modal
                     title="Fill your data"
                     visible={popup}
                     footer={[null]}
                     onCancel={handleCancel}>
                     <div className="AppWrapper mt-5 ">
                        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                           <CheckoutForm />
                        </Elements>
                     </div>
                  </Modal>
                  <Input placeholder="add your note here"  onChange={savenotes}/>
                  <Input placeholder="have a coupon ?"  onChange={saveCoupon}/> <Button onClick={checkCoupon}>check</Button><Button onClick={removeCoupon}>remove</Button>
                  <p style={{ fontWeight: "bold" }}>Total price : {totalprice}</p>
                  <p>Pay with</p>
                  <Button
                     style={{
                        backgroundColor: "#52bf55",
                        color: "#fff",
                        float: "right",
                     }}
                     onClick={handleVisa}>
                     Visa
                  </Button>
                  <Button
                     style={{
                        backgroundColor: "#52bf55",
                        color: "#fff",
                        float: "left",
                     }}
                     onClick={handleCash}>
                     Cash
                  </Button>
               </>
            )}
         </Card>
      );
   } else {
      return (
         <Card title="Cart" bordered={true} style={{ width: 300 }}>
            <p style={{ fontWeight: "bold", color: "red" }}>
               you have to login as client before order
            </p>
            <a className="btn-sm float-right btn-outline-info" href="/login">
               Login
            </a>
         </Card>
      );
   }
}
