import axios from "axios";
export const Axios = axios.create({
  baseURL: `https://raindrop-backend.herokuapp.com/`,
  //   baseURL: `http://localhost:3000`,
});

export const getNotifications = (start, end) => {
  return Axios.get(`/notifications/${start}/${end}`);
};

export const readNotifications = (body) => {
  return Axios.patch(`/notifications/hide`, body);
};

export const userLoginThroughWallet = (body) => {
  return Axios.post(`v2-wallet-login/user/auth/login`, body);
};

export const adminLoginThroughWallet = (body) => {
  return Axios.post(`v2-wallet-login/user/auth/admin-login`, body);
};

export const superAdminLoginThroughSSO = (body) => {
  return Axios.post(`/v1-sso/user/auth/super-admin-login`, body);
};

export const getDropTxCostSummary = (dropId) => {
  return Axios.get(`drop/${dropId}/tx-cost-summary`);
};
