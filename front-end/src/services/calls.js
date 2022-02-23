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
export const login = () => {

};
