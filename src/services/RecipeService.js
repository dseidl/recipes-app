import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

export default class RecipeService extends BackendService {

  fetchItems(page = 1) {
    return http.request({
      url: this.baseUrl + `recipes?page=${page}`,
      method: "GET",
      headers: this.getCommonHeaders(),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info(`Received ${data.data.length} recipes from the backend.`)

      return data;
    })
  }

  getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": 'Bearer ' + this.token,
    }
  }
}
