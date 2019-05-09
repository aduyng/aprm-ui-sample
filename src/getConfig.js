import axios from "axios";
export default async function getConfig() {
  const response = await axios("/config.json");
  return response.data;
}
