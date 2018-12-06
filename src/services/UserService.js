import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

export default class UserService extends BackendService {

  login(user) {
    return http.request({
      url: this.baseUrl + "oauth/token",
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        grant_type: 'password',
        client_id: 1,
        client_secret: 'xB7fgKGy8VDe2aBH2QMuC53oKf2H5LEw7WfYcB1g',
        username: user.email,
        password: user.password
      }),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('User logged in with token: ' + data.access_token)
      this.token = data.access_token;
    })
  }

  register(user) {
    console.log(this.baseUrl + "api/register", this.getCommonHeaders());

    return http.request({
      url: this.baseUrl + "api/register",
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        name: 'tempName',
        email: user.email,
        password: user.password,
        password_confirmation: user.confirmPassword
      }),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('User registered: ', data)
    })
  }

  logout() {
    this.token = ""
  }

  getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": '',
    }
  }
}
