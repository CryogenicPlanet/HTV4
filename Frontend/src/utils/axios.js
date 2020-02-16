import axios from "axios";

export default axios.create({
  baseURL: "http://35.188.12.206:3000/api/fridge/",
  responseType: "json"
});