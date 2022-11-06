import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import address from "./address";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    address,
  },
});

export default store;
