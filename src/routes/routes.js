import React, { useEffect } from "react";
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
import AllNearestProviders from "../views/providers/nearestProviders/AllNearestProviders";
import UnApprovedProviders from "../views/providers/unapproved/UnapprovedProviders";
import PendingOrders from "../views/providers/unapproved/pendingOrders";

import { Provider } from "react-redux";
import store from "./store";
import OrderStatus from "../views/orderStatus/orderStatus";
import AddCategory from "../views/providers/providerMenu/addCategories";
import EditCategory from "../views/providers/providerMenu/editCategories";

import AddItem from "../views/providers/providerMenu/addItem";
import EditItem from "../views/providers/providerMenu/editItem";

import AddItemOption from "../views/providers/providerMenu/addItemOption";
import EditItemOption from "../views/providers/providerMenu/editItemOption";

import AdditionalOption from "../views/providers/providerMenu/additionalOption";
import EditadditionalOption from "../views/providers/providerMenu/editadditionalOption";

import MenuEdit from "../views/providers/providerMenu/menu";
import Orders from "../views/myorders/orders";
import Coupon from "../views/coupons/coupon";
import CouponPanel from "../views/coupons/couponPanel";
import ReviewProvider from "../views/reviewProvider";
import AllDrivers from "../views/allDrivers/AllDrivers";
import GetAllMessages from "../views/contactUs/GetAllMessages";
import AddDriver from "../views/addDriver/addDriver";
import Careers from "../views/career/Career";
import jwt_decode from "jwt-decode";

export default function Routes() {
  const [status, token] = checkIfLoggedIn();
  const role = checkRole();

  useEffect(() => {
    if (status) {
      let decode = jwt_decode(token);
      if (parseInt(Date.now().toString().slice(0, -3)) > parseInt(decode.exp)) {
        localStorage.clear();
      }
    }
  }, []);

  return (
      <div>
      <Route path="/" exact>
        {status ? <App /> : <Redirect to="/login" />}
      </Route>
      <div className="container">
      <Route path="/allDrivers" exact>
        {status && role == "superuser" ? (
          <AllDrivers />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/getAllMessages" exact>
        {status && role == "superuser" ? (
          <GetAllMessages />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/addDriver" exact>
        {status && role == "superuser" ? (
          <AddDriver />
        ) : (
          <Redirect to="/login" />
        )}
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
      <Route
        path="/allProviders/:prov_type"
        component={AllResturants}
      />

      <Route path="/nearestProvides" exact>
        <AllNearestProviders />
      </Route>
      <Route path="/feedback" exact>
        <Feedback />
      </Route>
      <Route path="/careers" exact>
        <Careers />
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
        <Route path="/providerprofile/:id" component={ProviderProfile} />
      </Provider>
      <Route path="/unapproved" exact>
        <UnApprovedProviders />
      </Route>
      <Route path="/orderstate" exact>
        <PendingOrders />
      </Route>

      <Route path="/orderstatus/:id" component={OrderStatus} />
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

      <Route path="/editcategory/:id" exact>
        <EditCategory />
      </Route>
      <Route path="/edititem/:id" exact>
        <EditItem />
      </Route>
      <Route path="/edititemoption/:id" exact>
        <EditItemOption />
      </Route>
      <Route path="/editadditionaloption/:id" exact>
        <EditadditionalOption />
      </Route>

      <Route path="/menu/edit" exact>
        <MenuEdit />
      </Route>
      <Route path="/myorders" exact>
        <Orders />
      </Route>
      <Route path="/coupon/create" exact>
        {role === "superuser" ? <Coupon /> : <Redirect to="/login" />}
      </Route>
      <Route path="/coupon/panel" exact>
        <CouponPanel />
      </Route>
      <Route
        path="/review/provider/:prov_name/:prov_id"
        component={ReviewProvider}
      />
    </div>
    </div>
  );
}
