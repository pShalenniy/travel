import Vue from 'vue';
import CryptoJSAES from 'crypto-js/aes';
import CryptoJSEncUtf8 from 'crypto-js/enc-utf8';

export const getDecryptedValue = value => {
  if (!value) {
    return undefined;
  }

  const decryptedValue = CryptoJSAES.decrypt(
    value,
    process.env.VUE_APP_LS_ENC_KEY
  ).toString(CryptoJSEncUtf8);
  return JSON.parse(decryptedValue);
};

export const getEncryptedValue = storeValue => {
  const json = JSON.stringify(storeValue);
  return CryptoJSAES.encrypt(json, process.env.VUE_APP_LS_ENC_KEY).toString();
};

export const storeEncryptedValue = (storeName, storeValue) => {
  const encrypted = getEncryptedValue(storeValue);
  Vue.localStorage.set(storeName, encrypted);
  return encrypted;
};
