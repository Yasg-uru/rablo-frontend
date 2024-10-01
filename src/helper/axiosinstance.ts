import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://rablo-backend.vercel.app",
});
export default axiosInstance;
