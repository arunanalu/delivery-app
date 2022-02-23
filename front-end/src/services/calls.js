import api from './api';

export const registerUser = async (user) => {
  try {
    const response = await api.post('/register', { ...user });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data.message
      : 'Connection Failed!';
  }
};

export const getAllProducts = async (token) => {
  try {
    const response = await api.get('/product', {}, { headers: {
      authorization: token,
    } });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data.message
      : 'Connection Failed!';
  }
};
export const login = () => {

};
