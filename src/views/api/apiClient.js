import axios from 'axios';
const base = 'http://localhost:8200';

export const addTest = async (payload) => {
  try {
    console.log('payload', payload);
    const data = await axios.post('http://localhost:8200/test/add', payload);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findTest = async () => {
  try {
    const data = await axios.get(base + '/test/find/all/1/10');
    return data?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const findTestById = async (testId) => {
  try {
    return await axios.get(base + `/test/find/${testId}`);
  } catch (error) {
    console.log(error);
  }
};
