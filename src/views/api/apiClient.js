import axios from 'axios';

export const addTest = async (payload) => {
  try {
    console.log("payload",payload)
    const data = await axios.post('http://localhost:8200/test/add', payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
