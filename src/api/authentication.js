import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../constants/api_config'
// import Token from '../utils/Token';
//import axios from '../config/axios';
import axios from 'axios';
import {useAppContext} from '../context/AppContext';

export const register = data => {

  return new Promise((resolve, reject) =>
    axios
      .post(`${api.url}/users/signup`, data)

      .then(result => {
        resolve(result);
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      }),
  );
};

export const login = (phoneNumber, password) =>{
    const data = JSON.stringify({"phonenumber":phoneNumber,"password":password});

  return new Promise((resolve, reject) =>
    axios
      .post(`${api.url}users/login`, data)
      .then(resp => {
        if (resp?.data) {
          AsyncStorage.clear();
          AsyncStorage.setItem('token', resp?.data?.token).then(res => {
            resolve(resp);
          });
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      }),
  );}

export const submitNewPassword = data =>
  new Promise((resolve, reject) => {
    // console.log(data);
    axios
      .patch(`${api.url}/users/resetPassword/`, data)
      .then(resp => {
        if (resp?.data) {
          console.log({data: resp?.data});
          resolve(resp);
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      });
  });

export const submitNewPinCode = data =>
  new Promise((resolve, reject) => {
    // console.log(data);
    axios
      .patch(`${api.url}/users/resetCodePin`, data)
      .then(resp => {
        if (resp?.data) {
          console.log({data: resp?.data});
          resolve(resp);
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      });
  });

export const loginCodePin = data =>
  new Promise((resolve, reject) =>
    axios
      .post(`${api.url}/users/loginCodePin`, data, {
        headers: {
          Authorization: `Bearer ${Token.getToken()}`,
        },
      })
      .then(resp => {
        if (resp?.data) {
          // console.log(JSON.stringify(resp));
          AsyncStorage.clear();
          AsyncStorage.setItem('token', resp?.data?.token).then(res => {
            resolve(resp);
          });
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      }),
  );

export const resetPassword = data =>
  new Promise((resolve, reject) => {
    axios
      .post(`${api.url}/users/forgotPassword`, data)
      .then(resp => {
        if (resp?.data) {
          resolve(resp);
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      });
  });

export const resendCode = data => {
  return new Promise((resolve, reject) => {
    //console.log(data);
    axios
      .post(`${api.url}/users/envoyerCodeSMS`, data)
      .then(response => {
        // AsyncStorage?.setItem('token', response?.data?.token);
        return response;
      })
      .then(result => {
        if (result?.error) return reject(result);
        return resolve(result);
      })
      .catch(error => reject(error));
  });
};
export const verificationCode = data => {
  return new Promise((resolve, reject) => {
    //  console.log({dataVerif: data});
    axios
      .post(`${HOST_URL}/users/veriferCodeSMS`, data)
      .then(response => {
        // AsyncStorage?.setItem('token', response?.data?.token);
        return response;
      })
      .then(result => {
        if (result?.error) return reject(result);
        return resolve(result);
      })
      .catch(error => reject(error));
  });
};
export const getSodeUser = async (token = null) => {
  //console.log({token});
  //const token = await Token.getToken();
  return new Promise((resolve, reject) => {
    axios
      .get(`${HOST_URL}/transferts/solde`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => {
        if (resp?.data) {
          resolve(resp.data?.data);
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      });
  });
};

export const getCurrentUser = (token = null) =>
  // const token = await Token.getToken();
  new Promise((resolve, reject) => {
    axios
      .get(`${HOST_URL}/users/Me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(resp => {
        if (resp?.data) {
          resolve(resp.data?.data);
        }
      })
      .catch(err => {
        if (err?.response?.data) {
          reject(err?.response?.data);
        }
      });
  });