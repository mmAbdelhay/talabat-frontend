import React, { useState, useEffect } from "react";
import styles from "./providerProfile.module.css";
import {ServerIP} from "../../../assets/config"

export default function UpperInfo(props) {
   const [providerInformation, setProviderInformation] = useState();

   useEffect(() => {
      setProviderInformation(props?.providerInformation);
   }, [props]);
   return (
      <div className={styles.upper_info}>
         <div className={styles.provider_logo_holder}>
            <img
               className={styles.provider_logo}
               src={`${ServerIP}${providerInformation?.logo}`}
               alt="logo"
            />
         </div>
         <div className={styles.provider_information_holder}>
            <h1>{providerInformation?.name}</h1>
            <p>{providerInformation?.formatted_address}</p>
            <p>Min. Order: {providerInformation?.minimum_order}</p>
            <p>Delivery fee: {providerInformation?.delivery_fee}</p>
         </div>
      </div>
   );
}
