const axios = require('axios');

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://2wlih1.deta.dev/',
});

module.exports = api;
