import React,{ useState} from "react";
import { Redirect, Route } from "react-router-dom";
import { message } from "antd";

import { checkIfLoggedIn } from "../services/CheckUserStatus";
import { checkRole } from "../services/CheckUserRole";

import App from "../App";
import Signup from "../views/signup/SignUpTabs";
import Login from "../views/login/loginForm/loginForm";
import ContactUsForm from "../views/contactUs/contactUsForm";
import AllResturants from "../views/providers/allRestaurants";
import Feedback from "../views/feedback/feedback";
import Privacy from "../views/privacy/privacy";
import FAQ from "../views/FAQ/FAQ";
import Terms from "../views/terms/Terms";
import ProviderProfile from "../views/providers/providerprofile/providerprofile";

import ClinetProfile from "../views/profiles/ClientProfile";
import AllNearestProviders from '../views/providers/nearestProviders/AllNearestProviders';
import UnApprovedProviders from "../views/providers/unapproved/UnapprovedProviders";
import PendingOrders from "../views/providers/unapproved/pendingOrders";

import { Provider } from "react-redux";
import store from "./store";
import OrderStatus from "../views/orderStatus/orderStatus";
import AddCategory from "../views/providers/providerMenu/addCategories";
import AddItem from "../views/providers/providerMenu/addItem";
import AddItemOption from "../views/providers/providerMenu/addItemOption";
import AdditionalOption from "../views/providers/providerMenu/additionalOption";
import MenuEdit from "../views/providers/providerMenu/menu";
import Coupon from "../views/coupons/coupon"
import CouponPanel from "../views/coupons/couponPanel"


export default function Routes() {
   const [status] = checkIfLoggedIn();
   const role = checkRole();
   return (
      <div className="container">
         <Route path="/" exact>
            {status ? <App /> : <Redirect to="/login" />}
         </Route>
         <Route path="/login" exact>
            <Login />
         </Route>
         <Route path="/signup" exact>
            <Signup />
         </Route>
         <Route path="/contactus" exact>
            <ContactUsForm />
         </Route>
         <Route path="/allRestaurants" exact>
            <AllResturants />
         </Route>
         <Route path="/nearestProvides" exact>
            <AllNearestProviders />
         </Route>
         <Route path="/feedback" exact>
            <Feedback />
         </Route>
         <Route path="/privacy" exact>
            <Privacy />
         </Route>
         <Route path="/faq" exact>
            <FAQ />
         </Route>
         <Route path="/terms" exact>
            <Terms />
         </Route>
         <Route path="/myprofile" exact>
            <ClinetProfile />
         </Route>
         <Provider store={store}>
         <Route path="/providerprofile" exact>
            <ProviderProfile />
         </Route>
         </Provider>
         <Route path="/unapproved" exact>
            <UnApprovedProviders />
         </Route>
         <Route path="/orderstate" exact>
            <PendingOrders />
             <UnApprovedProviders />
         </Route>
         <Route path="/orderstatus" exact>
                <OrderStatus />
         </Route>
         <Route path="/addcategory" exact>
                <AddCategory />
         </Route>
         <Route path="/additem" exact>
                <AddItem />
         </Route>
         <Route path="/additemoption" exact>
                <AddItemOption />
         </Route>
         <Route path="/additionaloption" exact>
                <AdditionalOption />
         </Route>
         <Route path="/menu/edit" exact>
                <MenuEdit />
         </Route>
         <Route path="/coupon/create" exact>
            
            {
                role ==='superuser' ? <Coupon /> : <Redirect to="/login" />
            }
            
            
            
         </Route>
         <Route path="/coupon/panel" exact>
                <CouponPanel />
         </Route>

        
      </div>
   );
}
