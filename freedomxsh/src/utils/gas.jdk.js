// import { JSEncrypt } from 'jsencrypt';
// import CryptoJS from 'crypto-js';

// const publicKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCTbXZ91+43DNmT5ph+o69UGmgS
// Yr8g2peAOAyM62S2txT4xaFjAkOEjNebw6rcwJZSbu+l/YOI8+EW+TfNLqie4nPg
// 3eqHRDjScJFq81xblh6afKSowAMfCaZWL8kUdOZnOVB47LGhImKYbfwo82yygH0U
// 4+tnojt+cTyKZcZXuwIDAQAB
// -----END PUBLIC KEY-----`;

// const secret = 'ViQmKzCqtGoZwvqf4wRzfh26WBbR36YmwuLKkJGmT55';
// const jsencrypt = new JSEncrypt();
// jsencrypt.setPublicKey(publicKey);

// export const encrypt = content => {
//   let encrypted = CryptoJS.AES.encrypt(content, secret);
//   return encrypted.toString();
// };

// export const decrypt = content => {
//   const bytes = CryptoJS.AES.decrypt(content, secret);
//   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData;
// };

// export const encryptRsa = data => {
//   const hash = CryptoJS.SHA256(data);
//   // hash.update(data);
//   const sha = hash.toString(CryptoJS.enc.Hex);
//   return {
//     data: encrypt(data),
//     rsa: jsencrypt.encrypt(sha)
//   };
// };

import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';
var _0xb483 = [
  '\x5F\x64\x65\x63\x6F\x64\x65',
  '\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C'
];
(function (_0xd642x1) {
  _0xd642x1[_0xb483[0]] = _0xb483[1];
})(window);
var __Ox53533 = [
  '\x2D\x2D\x2D\x2D\x2D\x42\x45\x47\x49\x4E\x20\x50\x55\x42\x4C\x49\x43\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D\x0A\x4D\x49\x47\x66\x4D\x41\x30\x47\x43\x53\x71\x47\x53\x49\x62\x33\x44\x51\x45\x42\x41\x51\x55\x41\x41\x34\x47\x4E\x41\x44\x43\x42\x69\x51\x4B\x42\x67\x51\x43\x54\x62\x58\x5A\x39\x31\x2B\x34\x33\x44\x4E\x6D\x54\x35\x70\x68\x2B\x6F\x36\x39\x55\x47\x6D\x67\x53\x0A\x59\x72\x38\x67\x32\x70\x65\x41\x4F\x41\x79\x4D\x36\x32\x53\x32\x74\x78\x54\x34\x78\x61\x46\x6A\x41\x6B\x4F\x45\x6A\x4E\x65\x62\x77\x36\x72\x63\x77\x4A\x5A\x53\x62\x75\x2B\x6C\x2F\x59\x4F\x49\x38\x2B\x45\x57\x2B\x54\x66\x4E\x4C\x71\x69\x65\x34\x6E\x50\x67\x0A\x33\x65\x71\x48\x52\x44\x6A\x53\x63\x4A\x46\x71\x38\x31\x78\x62\x6C\x68\x36\x61\x66\x4B\x53\x6F\x77\x41\x4D\x66\x43\x61\x5A\x57\x4C\x38\x6B\x55\x64\x4F\x5A\x6E\x4F\x56\x42\x34\x37\x4C\x47\x68\x49\x6D\x4B\x59\x62\x66\x77\x6F\x38\x32\x79\x79\x67\x48\x30\x55\x0A\x34\x2B\x74\x6E\x6F\x6A\x74\x2B\x63\x54\x79\x4B\x5A\x63\x5A\x58\x75\x77\x49\x44\x41\x51\x41\x42\x0A\x2D\x2D\x2D\x2D\x2D\x45\x4E\x44\x20\x50\x55\x42\x4C\x49\x43\x20\x4B\x45\x59\x2D\x2D\x2D\x2D\x2D',
  '\x56\x69\x51\x6D\x4B\x7A\x43\x71\x74\x47\x6F\x5A\x77\x76\x71\x66\x34\x77\x52\x7A\x66\x68\x32\x36\x57\x42\x62\x52\x33\x36\x59\x6D\x77\x75\x4C\x4B\x6B\x4A\x47\x6D\x54\x35\x35',
  '\x73\x65\x74\x50\x75\x62\x6C\x69\x63\x4B\x65\x79',
  '\x65\x6E\x63\x72\x79\x70\x74',
  '\x41\x45\x53',
  '\x64\x65\x63\x72\x79\x70\x74',
  '\x65\x6E\x63',
  '\x70\x61\x72\x73\x65'
];
const publicKey = __Ox53533[0x0];
const secret = __Ox53533[0x1];
const jsencrypt = new JSEncrypt();
jsencrypt[__Ox53533[0x2]](publicKey);
export const encrypt = _0x7d2ax5 => {
  let _0x7d2ax6 = CryptoJS[__Ox53533[0x4]][__Ox53533[0x3]](_0x7d2ax5, secret);
  return _0x7d2ax6.toString();
};
export const decrypt = _0x7d2ax5 => {
  const _0x7d2ax8 = CryptoJS[__Ox53533[0x4]][__Ox53533[0x5]](_0x7d2ax5, secret);
  const _0x7d2ax9 = JSON[__Ox53533[0x7]](
    _0x7d2ax8.toString(CryptoJS[__Ox53533[0x6]].Utf8)
  );
  return _0x7d2ax9;
};
export const encryptRsa = _0x7d2axb => {
  const _0x7d2axc = CryptoJS.SHA256(_0x7d2axb);
  const _0x7d2axd = _0x7d2axc.toString(CryptoJS[__Ox53533[0x6]].Hex);
  return {
    data: encrypt(_0x7d2axb),
    rsa: jsencrypt[__Ox53533[0x3]](_0x7d2axd)
  };
};
