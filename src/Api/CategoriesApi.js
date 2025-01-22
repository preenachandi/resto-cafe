import axios from "axios";

// API URL with the proxy in place
const API_URL = "/api/resto-cafe/";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
