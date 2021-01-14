import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'frontendDashboard',
    component: () => import('../views/frontEnd/FrontendDashboard.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/frontEnd/Home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/frontEnd/About.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('../views/frontEnd/Signin.vue')
      },
      {
        path: 'products',
        name: 'frontEndproducts',
        component: () => import('../views/frontEnd/Products.vue')
      },
      {
        path: 'checkOut',
        name: 'checkOut',
        component: () => import('../views/frontEnd/CheckOut.vue')
      },
      {
        path: 'checkOrder/:orderId',
        name: 'checkOrder',
        component: () => import('../views/frontEnd/CheckOrder.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/backEnd/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/backEnd/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/backEnd/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/backEnd/Coupons.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

export default router
