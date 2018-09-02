import Vue from 'nativescript-vue';
import http from 'http';

import BackendService from './services/BackendService'

import Login from './components/Login'
import Recipes from './components/Recipes';


import './styles.scss';

const backendService = new BackendService();

// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

Vue.config.debug = true
Vue.prototype.$http = http

new Vue({

  render: h => {
    console.log("BackendService:", backendService.isLoggedIn())
    return h(backendService.isLoggedIn() ? Recipes : Login)
  },

}).$start();
