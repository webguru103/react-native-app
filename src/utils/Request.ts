import Axios from 'axios';
import { AsyncStorage } from 'react-native';

const axiosHeaders = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

const getAPI = async (uri, params) => {
  const token = await AsyncStorage.getItem('token');

  return await Axios.get(uri, {
    params,
    headers: {
      ...axiosHeaders,
      'authorization': 'Bearer ' + token,
    },
  });
};

const postAPI = async (uri, params, data, header) => {
  const token = await AsyncStorage.getItem('token');
  let headers = {};

  if (header) {
    headers = header;
  } else {
    headers = { ...axiosHeaders };
  }

  return await Axios.post(uri, data, {
    params,
    headers: {
      ...headers,
      'authorization': 'Bearer ' + token,
    }
  });
};

const basicPostAPI = async (uri, params, data) => {
  console.log(2222, uri, data);
  return await Axios.post(uri, data, {
    params: {},
    headers: axiosHeaders,
  });
};

const putAPI = async (uri, params, data) => {
  const token = await AsyncStorage.getItem('token');

  return await Axios.put(uri, data, {
    params,
    headers: {
      ...axiosHeaders,
      'authorization': 'Bearer ' + token,
    }
  });
};

const deleteAPI = async (uri, params) => {
  const token = await AsyncStorage.getItem('token');

  return await Axios.delete(uri, {
    params,
    headers: {
      ...axiosHeaders,
      'authorization': 'Bearer ' + token,
    }
  });
};

export default {
  getAPI,
  postAPI,
  basicPostAPI,
  putAPI,
  deleteAPI
};
