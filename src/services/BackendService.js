import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = "token";

export default class BackendService {
  constructor() {
    this.baseUrl = "https://recipes.dseidl.me/"
  }

  get token() {
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
  }

  isLoggedIn() {
    return !!getString(tokenKey);
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      resolve(response.content.toJSON())
    })
    .catch(e => {
      throw 'Error parsing JSON response: ' + e
    })
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
    })
  }
}
