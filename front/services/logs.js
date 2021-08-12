import axios from "axios";
import vars from "../config/vars";

const getLogs = () =>
  axios.get(`${vars.backUrl}/logs`).then((response) => response.data);

export { getLogs };
