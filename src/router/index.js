import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    name: 'frontendDashboard',
    component: () => '../views/frontEnd/frontendDashboard.vue',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => '../views/frontEnd/home.vue'
      },
      {
        path: 'about',
        name: 'about',
        component: () => '../views/frontEnd/about.vue'
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => '../views/frontEnd/signin.vue'
      },
      {
        path: 'products',
        name: 'frontEndproducts',
        component: () => '../views/frontEnd/products.vue'
      },
      {
        path: 'checkOut',
        name: 'checkOut',
        component: () => '../views/frontEnd/checkOut.vue'
      },
      {
        path: 'checkOrder/:orderId',
        name: 'checkOrder',
        component: () => '../views/frontEnd/checkOrder.vue'
      }
    ]
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: () => '../views/backEnd/dashboard.vue',
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => '../views/backEnd/products.vue',
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => '../views/backEnd/orders.vue',
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => '../views/backEnd/coupons.vue',
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
