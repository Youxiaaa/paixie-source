<template>
    <div>

        <!-- loading效果 -->
        <loading :active.sync="isLoading"></loading>

        <div class="hamburgerMenu" :class="{'hamburgerMenuShow' : hamburgerChange}">

          <div class="d-flex flex-column align-items-center justify-content-between hamburgerMenuList">

          <div>
          </div>

          <div>
            <ul class="mb-5 pl-0">

              <li class="list-unstyled">
                <a href="#" class="my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('coupons')">管理折價券</a>
              </li>

              <li class="list-unstyled">
                <a href="#" class="my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('orders')">訂單列表</a>
              </li>

              <li class="list-unstyled">
                <a href="#" class="my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('products')">產品列表</a>
              </li>

              <li class="list-unstyled">
                <a href="#" class="my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="logOut">登出</a>
              </li>

            </ul>
          </div>

          <div class="text-white">

            <a href="#">
              <i class="fab fa-twitter-square fa-2x"></i>
            </a>

          </div>

          </div>

        </div>

        <div class="hamburgerIcon" @click="hamburgerChange = !hamburgerChange">
          <div class="hamburgerLine1" :class="{'hamburgerLine1Change' : hamburgerChange}"></div>
          <div class="hamburgerLine2" :class="{'hamburgerLine2Change' : hamburgerChange}"></div>
          <div class="hamburgerLine3" :class="{'hamburgerLine3Change' : hamburgerChange}"></div>
        </div>

        <header>
          <nav class="backEndNav d-flex justify-content-between navBar bg-white">

            <div>
              <h1>
                <a href="#" class="backEndlogo" title="拍謝後台管理系統">拍謝後台管理系統</a>
              </h1>
            </div>

            <div class="align-vm-center">
              <ul class="d-flex topMenu pl-0">
                <li class="list-unstyled">
                  <a href="#" :class="{'topMenuActive' : couponsIsActive}" @click.prevent="toWhere('coupons')">管理折價券</a>
                </li>

                <li class="list-unstyled">
                  <a href="#" :class="{'topMenuActive' : ordersIsActive}" @click.prevent="toWhere('orders')">訂單列表</a>
                </li>

                <li class="list-unstyled">
                  <a href="#" :class="{'topMenuActive' : productsIsActive}" @click.prevent="toWhere('products')">產品列表</a>
                </li>

                <li class="list-unstyled">
                  <a href="#" @click.prevent="logOut">登出</a>
                </li>
              </ul>
            </div>

          </nav>
        </header>

    </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      couponsIsActive: false,
      ordersIsActive: false,
      productsIsActive: true,
      isLoading: false,
      hamburgerChange: false
    }
  },
  methods: {
    logOut () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm = this

      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          $('.rightCurtain1').addClass('curtainShow')
          $('.rightCurtain2').addClass('curtain2Show')
          vm.$router.push('/signin')

          setTimeout(() => {
            vm.$bus.$emit('getPathName')
          }, 10)
        }
      })
    },
    toWhere (pathName) {
      const vm = this

      vm.isLoading = true

      if (pathName === 'coupons') {
        vm.couponsIsActive = true
        vm.ordersIsActive = false
        vm.productsIsActive = false
        vm.hamburgerChange = false
      } else if (pathName === 'orders') {
        vm.couponsIsActive = false
        vm.ordersIsActive = true
        vm.productsIsActive = false
        vm.hamburgerChange = false
      } else {
        vm.couponsIsActive = false
        vm.ordersIsActive = false
        vm.productsIsActive = true
        vm.hamburgerChange = false
      }

      setTimeout(() => {
        vm.isLoading = false
      }, 1500)

      vm.$router.push(pathName)
    },
    onloadTopmenu () {
      const vm = this
      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))
      switch (addrLast) {
        case 'orders' :
          vm.couponsIsActive = false
          vm.ordersIsActive = true
          vm.productsIsActive = false
          break
        case 'products' :
          vm.couponsIsActive = false
          vm.ordersIsActive = false
          vm.productsIsActive = true
          break
        case 'coupons' :
          vm.couponsIsActive = true
          vm.ordersIsActive = false
          vm.productsIsActive = false
          break
        default :
          vm.couponsIsActive = false
          vm.ordersIsActive = false
          vm.productsIsActive = false
          break
      }
    }
  },
  created () {
    window.addEventListener('load', this.onloadTopmenu)
  }
}
</script>
