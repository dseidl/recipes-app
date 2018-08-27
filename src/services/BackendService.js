import { getString, setString } from 'tns-core-modules/application-settings'

const tokenKey = "token";

export default class BackendService {
  constructor() {
    this.baseUrl = "https://recipes.dseidl.me/"
  }

  get token() {
    console.log('GETTING TOKEN: ' + getString(tokenKey))
    return getString(tokenKey);
  }

  set token(newToken) {
    setString(tokenKey, newToken);
    console.log('TOKEN SET TO: ' + newToken)
  }

  isLoggedIn() {
    console.log('GETTING TOKEN LOGGED IN: ' + getString(tokenKey))
    return !!getString(tokenKey);
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      console.info('Content: ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw 'Error parsing JSON response: ' + e
      })
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
      console.log('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
      reject('Response with code: ' + response.statusCode +
        '\nContent: ' + response.content.toString())
    })
  }
}
