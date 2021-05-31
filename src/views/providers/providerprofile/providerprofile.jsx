import React, { useEffect, useState } from "react";
import styles from "./providerProfile.module.css";
import { getProviderInfo } from "../../../services/getProviderInfo";

export default function ProviderProfile() {
   const [providerInformation, setProviderInformation] = useState({});

   useEffect(async () => {
      const returnedInformation = await getProviderInfo("abbdab3a-6ef8-4e11-83a9-3697c63f2289");
      setProviderInformation(returnedInformation?.data?.Provider);
   }, []);

   return (
      <div className={styles.main_page}>
         <div>Basic Info</div>
         <div>{providerInformation.name}</div>
      </div>
   );
}
