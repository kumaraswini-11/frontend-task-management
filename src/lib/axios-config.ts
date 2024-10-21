import axios from "axios";

import { baseUrl } from "./constants";

// Create an Axios instance with a predefined configuration
export const axiosInstance = axios.create({
  baseURL: baseUrl, // Set the base URL for all requests made with this instance
  withCredentials: true, // Include credentials (like cookies) in cross-site requests
  timeout: 5000, // Set the maximum time (in milliseconds) to wait for a response
});
