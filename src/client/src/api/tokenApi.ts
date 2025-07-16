import axios from 'axios';

const TokenAPI = axios.create({
    baseURL: 'http://localhost:3000/customer/users',
});


const token = localStorage.getItem('token');
if (token) {
  TokenAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default TokenAPI;
