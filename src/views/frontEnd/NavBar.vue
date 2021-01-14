<template>
    <div>

      <header>

        <nav>

          <div class="hamburgerMenu" :class="{'hamburgerMenuShow' : hamburgerChange}">

            <div class="d-flex flex-column align-items-center justify-content-between hamburgerMenuList">

            <div>
            </div>

            <div>
              <ul class="mb-5 pl-0">
                <li class="list-unstyled"><a href="#" class="h4" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('signin')">登入</a></li>
                <li class="list-unstyled"><a href="#" class="h4 my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('about')">品牌故事</a></li>
                <li class="list-unstyled"><a href="#" class="h4" :class="{'hamburgerTextShow' : hamburgerChange}"  @click.prevent="toWhere('products')">商品</a></li>
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

          <div class="navBar" :class="{'navBarChange' : isPageover10px}">

            <h1 class="logo d-flex justify-content-center mt-1" v-if="isHomepage">
              <a href="#" title="拍謝" @click.prevent="toWhere('')" :class="{'logoDark' : isPageover10px}">
                拍謝
              </a>
            </h1>

            <h1 class="logo d-flex justify-content-center mt-1" v-if="!isHomepage">
              <a href="#" title="拍謝" @click.prevent="toWhere('')" class="logoDark">
                拍謝
              </a>
            </h1>

              <div class="topMenu ml-auto" v-if="isHomepage">
                <ul class="d-flex mb-0">
                  <li class="list-unstyled">
                    <a href="#" class="text-white" @click.prevent="toWhere('about')"
                    @mouseover="aboutisHovering = true"
                    @mouseout="aboutisHovering = false"
                    :class="{'text-secondary' : isPageover10px , 'topMenuActive' : aboutisActive}"
                    >品牌故事</a>
                  </li>

                  <li class="list-unstyled">
                    <a href="#" class="text-white" @click.prevent="toWhere('products')"
                    @mouseover="productsisHovering = true"
                    @mouseout="productsisHovering = false"
                    :class="{'text-secondary' : isPageover10px , 'topMenuActive' : productsisActive}"
                    >商品</a>
                  </li>

                  <li class="list-unstyled">
                    <a href="#" class="text-white" @click.prevent="toWhere('signin')"
                    @mouseover="signinisHovering = true"
                    @mouseout="signinisHovering = false"
                    :class="{'text-secondary' : isPageover10px , 'topMenuActive' : signinisActive}"
                    >登入</a>
                  </li>
                </ul>
              </div>

              <div class="topMenu ml-auto" v-if="!isHomepage">
                <ul class="d-flex mb-0">
                  <li class="list-unstyled">
                    <a href="#" @click.prevent="toWhere('about')"
                    @mouseover="aboutisHovering = true"
                    @mouseout="aboutisHovering = false"
                    :class="{'topMenuActive' : aboutisActive}"
                    >品牌故事</a>
                  </li>

                  <li class="list-unstyled">
                    <a href="#" @click.prevent="toWhere('products')"
                    @mouseover="productsisHovering = true"
                    @mouseout="productsisHovering = false"
                    :class="{'topMenuActive' : productsisActive}"
                    >商品</a>
                  </li>

                  <li class="list-unstyled">
                    <a href="#" @click.prevent="toWhere('signin')"
                    @mouseover="signinisHovering = true"
                    @mouseout="signinisHovering = false"
                    :class="{'topMenuActive' : signinisActive}"
                    >登入</a>
                  </li>
                </ul>
              </div>

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
      isPageover10px: false,
      isHomepage: true,
      hamburgerChange: false,
      aboutisHovering: false,
      aboutisActive: false,
      productsisHovering: false,
      productsisActive: false,
      signinisHovering: false,
      signinisActive: false,
      isTransition: false
    }
  },
  methods: {
    toWhere (pageName) {
      const vm = this
      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))

      if (addrLast === pageName) { return }

      vm.hamburgerChange = false

      $('.hamburgerMenu').removeClass('hamburgerMenuShow')
      $('.rightCurtain1').addClass('curtainShow')
      $('.rightCurtain2').addClass('curtain2Show')

      setTimeout(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        vm.$router.push(`/${pageName}`)
      }, 1000)
    },

    navBarchange () {
      const vm = this
      const pageScroll = window.scrollY

      $('.navBar').each(function () {
        if (pageScroll > 10) {
          vm.isPageover10px = true
        } else {
          vm.isPageover10px = false
        }
      })
    },
    onloadTopmenu () {
      const vm = this
      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))

      switch (addrLast) {
        case 'about' :
          vm.isHomepage = false
          vm.aboutisActive = true
          vm.productsisActive = false
          vm.signinisActive = false
          break
        case 'products' :
          vm.isHomepage = false
          vm.aboutisActive = false
          vm.productsisActive = true
          vm.signinisActive = false
          break
        case 'signin' :
          vm.isHomepage = false
          vm.aboutisActive = false
          vm.productsisActive = false
          vm.signinisActive = true
          break
        case '' :
          vm.isHomepage = true
          vm.aboutisActive = false
          vm.productsisActive = false
          vm.signinisActive = false
          break
        default :
          vm.isHomepage = false
          vm.aboutisActive = false
          vm.productsisActive = false
          vm.signinisActive = false
          break
      }
    }
  },
  created () {
    const vm = this

    vm.$bus.$on('getPathName', () => {
      vm.onloadTopmenu()
    })

    vm.$bus.$on('toWhere', (pathName) => {
      vm.toWhere(pathName)
    })

    window.addEventListener('scroll', this.navBarchange)
    window.addEventListener('load', this.onloadTopmenu)
  }
}
</script>
