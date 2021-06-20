import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import menu_item from "../../../assets/imgs/menu_item.png";
import { ServerIP } from "../../../assets/config";
import discount from "../../../assets/imgs/big sale.png";
import styles from "./ItemComponent.module.css";
import { checkIfLoggedIn } from "../../../services/CheckUserStatus";
import { checkRole } from "../../../services/CheckUserRole";
import AddToCartModal from "./item_options_modal";

export default function ItemComponent(props) {
  const [item, setItem] = useState();
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);

  useEffect(() => {
    const [loginStatus, loginToken] = checkIfLoggedIn();
    const role = checkRole();
    if (loginStatus && role === "client") setIsClientLoggedIn(true);
  }, []);

  useEffect(() => {
    setItem(props?.item);
  }, [props]);

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

        <div>
          <p>
            {item?.old_price > item?.price && (
              <img src={discount} className={styles.discount} alt="discount" />
            )}
            <span style={{ fontWeight: "bold" }}>price :</span> {item?.price}
          </p>

          {isClientLoggedIn && (
            <Tooltip title="Add to Cart">
              <AddToCartModal item={item} providerId={props.providerId} />
            </Tooltip>
          )}
        </div>
      </div>
    </>
  );
}
