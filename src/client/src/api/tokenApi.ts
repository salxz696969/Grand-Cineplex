import axios from "axios";

const TokenAPICustomer = axios.create({
  baseURL: "http://localhost:6900/customer/users",
});

const TokenAPICashier = axios.create({
  baseURL: "http://localhost:6900/cashier/users",
});

const TokenAPIManager = axios.create({
  baseURL: "http://localhost:6900/manager/users",
});

const token = localStorage.getItem("token");
if (token) {
  TokenAPICustomer.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default { TokenAPICustomer, TokenAPICashier, TokenAPIManager };
