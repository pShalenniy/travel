import CryptoJSAES from 'crypto-js/aes';
import CryptoJSEncUtf8 from 'crypto-js/enc-utf8';

export default {
  decryptedUser(encriptedUser) {
    try {
      let decriptedUser = CryptoJSAES.decrypt(
        encriptedUser,
        process.env.VUE_APP_LS_ENC_KEY
      ).toString(CryptoJSEncUtf8);
      return JSON.parse(decriptedUser);
    } catch (err) {
      return undefined;
    }
  }
};
