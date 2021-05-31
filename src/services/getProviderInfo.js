import { ServerIP } from "../assets/config";

import axios from "axios";

export const getProviderInfo = async (provider_id) => {
   return await axios.get(ServerIP + "/api/v1/guest/lookup/providersinfo/" + provider_id);
};
