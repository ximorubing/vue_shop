import Vue from 'vue'
import VueRouter from 'vue-router'

const Login=()=>import('../components/login/Login.vue')
const Home=()=>import('../components/home/Home.vue')
const Welcome=()=>import('../components/home/Welcome.vue')
const Users=()=>import('../components/user/Users.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path:'/home',component:Home,redirect:'/welcome'
  ,children:[
    {path:'/welcome',component:Welcome},
    {path:'/users',component:Users}
  
  ]}
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  let isLogin=window.sessionStorage.getItem('token');
  if(isLogin){
    next()
  }else{
    if (to.path=='/login'){
      next()
    }else{
      next('/login')
    }
  }

})
export default router
