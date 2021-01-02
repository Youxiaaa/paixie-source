import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'frontendDashboard',
    redirect: 'home',
    component: () => import('../views/frontEnd/frontendDashboard.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/frontEnd/home.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/frontEnd/about.vue')
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('../views/frontEnd/signin.vue')
      },
      {
        path: 'products',
        name: 'frontEndproducts',
        component: () => import('../views/frontEnd/products.vue')
      },
      {
        path: 'checkOut',
        name: 'checkOut',
        component: () => import('../views/frontEnd/checkOut.vue')
      },
      {
        path: 'checkOrder/:orderId',
        name: 'checkOrder',
        component: () => import('../views/frontEnd/checkOrder.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => import('../views/backEnd/dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/backEnd/products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/backEnd/orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/backEnd/coupons.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
