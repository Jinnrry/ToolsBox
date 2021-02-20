import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Json2Struct from "../components/Json2Struct";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Json2Struce',
      name: 'Json2Struce',
      component: Json2Struct
    },
  ]
})
