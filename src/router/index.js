import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  // //图片懒加载
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  {
    path: '/login',
    // redirect: 'login'
    name: 'login',
    component: () => import('@/views/Login')
  },
  // {
  //   path: '/login',
  //   component: Login

  // },
  // 底部组件
  {
    path: '/',
    name: 'layout', // 如果副路由有默认子路由，那他的name没有意义
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/layout'),
    // 配置底部组件的子路由
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/home')
      },

      {
        path: '/qa',
        name: 'qa',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/video')
      },
      {
        path: '/My',
        name: 'My',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/My')
      }
    ]
  },
  {
    path: '/search', // 默认子路由
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/search')
  },
  {
    // 动态路由
    path: '/article/:articleId', // 默认子路由
    name: 'article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/article'),
    props: true// 开启propos传参 说白了就是把路由参数映射到组件中
  },
  {
    // 动态路由
    path: '/user/profile', // 默认子路由
    name: 'user-profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/user-profile')

  }
]

const router = new VueRouter({
  routes
})

export default router
