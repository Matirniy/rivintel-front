import axios from "axios";

const browserApi = axios.create({
  baseURL:
    typeof window === "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : "",
  withCredentials: true,
});

export default browserApi;
