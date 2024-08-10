import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Add this line to accept httponly cookies
});

export default instance;