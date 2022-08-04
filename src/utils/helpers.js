import Cookies from 'js-cookie';
import _, { first, values } from 'lodash';

const TokenKey = 'Token';

const getToken = () => {
  return Cookies.get(TokenKey);
};

const setToken = (token) => {
  return Cookies.set(TokenKey, token);
};

const removeToken = () => {
  return Cookies.remove(TokenKey);
};

const createMarkup = (encodedHtml) => ({
  __html: _.unescape(encodedHtml),
});

const emailAddressRegex = /\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const getServerError = (error) => {
  let serverError = '';
  if (error.response.status === 400 && !_.isString(first(values(error.response.data)[0]))) {
    serverError = error.response.data.message;
  } else if (error.response.status === 400) {
    serverError = first(values(error.response.data)[0]);
  } else {
    serverError = error.response.statusText;
  }
  return serverError;
};

const isNegative = (num) => Math.sign(num) === -1;

const fontFamily = [
  { family: `GothamBook` },
  { family: `GothamMedium` },
  { family: `GothamBold` },
  { family: `Rubik` },
];

export { setToken, getToken, removeToken, emailAddressRegex, getServerError, createMarkup, isNegative, fontFamily };
