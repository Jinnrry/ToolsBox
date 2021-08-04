import Vue from 'vue'
import Router from 'vue-router'
import Index from "../components/Index";
import Json2Struct from "../components/Json2Struct";
import BeautifulJson from "../components/BeautifulJson";
import Sql2Struct from "../components/Sql2Struct";
import About from "../components/About";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Json2Struce',
      component: Json2Struct
    },
    {
      path: '/Json2Struce',
      name: 'Json2Struce',
      component: Json2Struct
    },
    {
      path: '/BeautifulJson',
      name: 'BeautifulJson',
      component: BeautifulJson
    },
    {
      path: '/Sql2Struct',
      name: 'Sql2Struct',
      component: Sql2Struct
    },
    {
      path: "/About",
      name: "About",
      component: About
    }
  ]
})
