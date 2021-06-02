import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../../routes/cartSlice";
import { MinusOutlined, RightOutlined } from "@ant-design/icons";
import { checkIfLoggedIn } from "../../../services/CheckUserStatus";
import { checkRole } from "../../../services/CheckUserRole";

export default function Cart() {
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [totalprice, setTotalprice] = useState(0);

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

  const handleCheckOut = () => {
    sessionStorage.setItem("totalprice", totalprice);
    // you can here render to check out component you have array of items and totalprice in sessiosStorage
  };

  if (isClientLoggedIn) {
    return (
      <Card title="Cart" bordered={true} style={{ width: 300 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: 70,
          }}
        >
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
            }}
          >
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
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p>{item?.name}</p>
                <p>{item?.quantity}</p>
                <p>{item?.price}</p>
                {item?.price > 0 && (
                  <Button
                    type="danger"
                    size="small"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    {<MinusOutlined />}
                  </Button>
                )}
              </div>
            </>
          );
        })}
        {totalprice > 0 && (
          <>
            <p style={{ fontWeight: "bold" }}>Total price : {totalprice}</p>
            <Button
              style={{
                backgroundColor: "#52bf55",
                color: "#fff",
                float: "right",
              }}
              onClick={handleCheckOut}
            >
              checkout
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
