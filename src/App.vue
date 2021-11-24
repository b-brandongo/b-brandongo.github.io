<template>
  <div id="app">
    <Locale/>
    <Calculator/>
  </div>
</template>

<script>
import Calculator, { messages } from './components/Calculator.vue'
import Locale from './components/Locale.vue'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts'
import VueI18n from 'vue-i18n'

Vue.use(VueApexCharts);
Vue.use(BootstrapVue);
Vue.use(VueI18n);

Vue.component('apexchart', VueApexCharts);

const getLang = () => (navigator.language || navigator.browserLanguage || (navigator.languages || ["en"]) [0]).slice(0, 2);

const i18n = new VueI18n({
  locale: getLang(),
  messages
});

export default {
  name: 'App',
  i18n,
  components: {
    Calculator,
    Locale,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
