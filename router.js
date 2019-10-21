import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/order',
      name: 'orders',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/order/OrderList.vue')
    },
    {
      path: '/order/:orderId',
      component: () => import('./views/order/OrderDetail.vue')
    },
    {
      path: '/product',
      name: 'product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/product/ProductInventory.vue')
    },
    {
      path: '/product/create',
      component: () => import('./views/product/ProductCreate.vue')
    },
    {
      path: '/product/:productId',
      component: () => import('./views/product/ProductDetail.vue')
    },
    {
      path: '/product/:productId/:mode',
      component: () => import('./views/product/ProductCreate.vue')
    },
    {
      path: '/cs',
      component: () => import('./views/cs/CSList.vue')
    },
    {
      path: '/mission',
      component: () => import('./views/mission/MissionList.vue')
    },
    {
      path: '/mission/:missionId',
      component: () => import('./views/mission/MissionDetail.vue')
    },
    {
      path: '/user',
      component: () => import('./views/user/UserList.vue')
    },
    {
      path: '/user/:userId',
      component: () => import('./views/user/UserDetail.vue')
    },
    {
      path: '/board/notice',
      component: () => import('./views/board/NoticeList.vue')
    },
    {
      path: '/board/event',
      component: () => import('./views/board/EventList.vue')
    },
    {
      path: '/board/create',
      component: () => import('./views/board/CreateBoard.vue')
    },
  ]
})
