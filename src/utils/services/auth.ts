import { AsyncStorage } from 'react-native';
import config from './config';
import Request from '../Request';

const API_ROOT = config.ROOT_URL;
const BASE_ROOT = config.BASIC_API_ROOT;

const login = ({ params, data }) => {
  return Request.basicPostAPI(`${API_ROOT}/login`, params, data)
    .then(response => {
      const result = {
        token: response.data.token,
        user: response.data.user,
        error: ''
      };

      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      return result;
    }).catch(err => {
      return { error: 'Register Failed!', user: undefined, token: '' };
    });
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    return 'Done';
  } catch (error) {
    return error;
  }
};

const register = ({ params, data }) => {
  return Request.basicPostAPI(`${API_ROOT}/register`, params, data)
    .then(response => {
      const result = {
        user: response.data.user,
        token: response.data.token,
        error: ''
      };

      if (response.data.token && response.data.user) {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return result;
    }).catch(err => {
      return { error: 'Register Failed!', user: undefined, token: '' };
    });
};

const activateKeycode = ({ params, data }) => {
  return Request.basicPostAPI(`${API_ROOT}/activateKeycode`, params, data)
    .then(response => {
      const result = {
        status: response.data.status,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Activation Failed!', status: false };
    });
};

const requestPassword = ({ data }) => {
  return Request.basicPostAPI(`${API_ROOT}/phone-verify`, null, data)
    .then(response => {
      const result = {
        status: response.data.status,
        code: response.data.code,
        user: response.data.user,
        error: ''
      };

      if (response.data.code) {
        AsyncStorage.setItem('code', response.data.code);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return result;
    }).catch(err => {
      return {
        error: 'Request Failed!',
        user: false,
        code: '',
        status: false
      };
    });
}

const verifyPhone = ({ data }) => {
  return Request.basicPostAPI(`${API_ROOT}/phone-verify`, null, data)
    .then(response => {
      const result = {
        status: response.data.status,
        code: response.data.code,
        user: response.data.user,
        error: ''
      };

      AsyncStorage.setItem('code', response.data.code);
      AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      return result;
    }).catch(err => {
      return {
        error: 'Verification Failed!',
        user: false,
        code: '',
        status: false
      };
    });
};

const resetPassword = ({ params, data }) => {
  return Request.basicPostAPI(`${API_ROOT}/reset-password`, params, data)
    .then(response => {
      const result = {
        status: response.data.status,
        error: ''
      };

      return result;
    }).catch(err => {
      return { error: 'Reset Failed!', status: false };
    });
};

const scanKeycode = ({ uid, assign, userId, token }) => {
  const url = BASE_ROOT + '/keycodes/scans/admin'
}

export default {
  login,
  logout,
  register,
  activateKeycode,
  requestPassword,
  verifyPhone,
  resetPassword,
}
