import api from './api';

const connectionFailed = 'Connection Failed!';

export const registerUser = async (user) => {
  try {
    const response = await api.post('/register', { ...user });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data.message
      : connectionFailed;
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
      : connectionFailed;
  }
};
export const login = () => {

};

export const sale = async (saleObj, token) => {
  try {
    const response = await api.post('/sale', saleObj, {
      headers: {
        authorization: token,
      },
    });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data.message
      : connectionFailed;
  }
};
