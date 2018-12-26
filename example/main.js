// 入口文件
import Vue from 'vue';
import Scrool from '../src/index.js';
Vue.component(Scrool.name, Scrool)

// 导入 App 根组件
import app from './index.vue';
var vm = new Vue({
  el: '#app',
  render: c => c(app)
});