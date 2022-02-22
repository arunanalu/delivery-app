import axios from 'axios';

export const registerUser = async (user) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:3001/register',
      data: { ...user },
    });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data.message
      : 'Connection Failed!';
  }
};
export const login = () => {

};
