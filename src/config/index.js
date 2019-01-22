// @flow
const { protocol, host } = window.location;
let apiBaseUrl = `${protocol}//${host}`;

if (/^(development|test)$/.test(process.env.NODE_ENV)) {
  apiBaseUrl = 'http://localhost:9000';
}

const csrfCookieName = '';


export default { apiBaseUrl, csrfCookieName };
