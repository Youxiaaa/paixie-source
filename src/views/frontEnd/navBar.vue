<template>
    <div>

        <header>

            <nav>

                <div class="hamburgerMenu" :class="{'hamburgerMenuShow' : hamburgerChange}">

                    <div class="d-flex flex-column align-items-center justify-content-between hamburgerMenuList">

                    <div>
                    </div>

                    <div>
                        <ul class="mb-5">
                            <li><a href="#" class="h4" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('signin',menuActive('signin'))">登入</a></li>
                            <li><a href="#" class="h4 my-5" :class="{'hamburgerTextShow' : hamburgerChange}" @click.prevent="toWhere('about',menuActive('about'))">品牌故事</a></li>
                            <li><a href="#" class="h4" :class="{'hamburgerTextShow' : hamburgerChange}"  @click.prevent="toWhere('products',menuActive('products'))">商品</a></li>
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
                        <a href="#" title="拍謝" @click.prevent="toWhere('home'),menuActive('home')" :class="{'logoDark' : isPageover10px}">
                            拍謝
                        </a>
                    </h1>

                    <h1 class="logo d-flex justify-content-center mt-1" v-if="!isHomepage">
                        <a href="#" title="拍謝" @click.prevent="toWhere('home'),menuActive('home')" class="logoDark">
                            拍謝
                        </a>
                    </h1>

                    <div class="topMenu ml-auto" v-if="isHomepage">
                        <ul class="d-flex">
                            <li>
                                <a href="#" class="text-white" @click.prevent="toWhere('about'),menuActive('about')"
                                @mouseover="aboutisHovering = true"
                                @mouseout="aboutisHovering = false"
                                :class="{'text-secondary' : isPageover10px , 'topMenuActive' : aboutisActive}"
                                >品牌故事</a>
                            </li>

                            <li>
                                <a href="#" class="text-white" @click.prevent="toWhere('products',menuActive('products'))"
                                @mouseover="productsisHovering = true"
                                @mouseout="productsisHovering = false"
                                :class="{'text-secondary' : isPageover10px , 'topMenuActive' : productsisActive}"
                                >商品</a>
                            </li>

                            <li>
                                <a href="#" class="text-white" @click.prevent="toWhere('signin',menuActive('signin'))"
                                @mouseover="signinisHovering = true"
                                @mouseout="signinisHovering = false"
                                :class="{'text-secondary' : isPageover10px , 'topMenuActive' : signinisActive}"
                                >登入</a>
                            </li>
                        </ul>
                    </div>

                    <div class="topMenu ml-auto" v-if="!isHomepage">
                        <ul class="d-flex">
                            <li>
                                <a href="#" @click.prevent="toWhere('about'),menuActive('about')"
                                @mouseover="aboutisHovering = true"
                                @mouseout="aboutisHovering = false"
                                :class="{'topMenuActive' : aboutisActive}"
                                >品牌故事</a>
                            </li>

                            <li>
                                <a href="#" @click.prevent="toWhere('products',menuActive('products'))"
                                @mouseover="productsisHovering = true"
                                @mouseout="productsisHovering = false"
                                :class="{'topMenuActive' : productsisActive}"
                                >商品</a>
                            </li>

                            <li>
                                <a href="#" @click.prevent="toWhere('signin',menuActive('signin'))"
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
      const self = this

      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('\/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))

      if (addrLast == pageName) { return };

      self.hamburgerChange = false

      $('.hamburgerMenu').removeClass('hamburgerMenuShow')
      $('.rightCurtain1').addClass('curtainShow')
      $('.rightCurtain2').addClass('curtain2Show')

      setTimeout(() => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0

        self.$router.push(`/${pageName}`)
      }, 1200)
    },
    menuActive (pathName) {
      const self = this

      switch (pathName) {
        case 'about' :
          self.isHomepage = false
          self.aboutisActive = true
          self.productsisActive = false
          self.signinisActive = false
          break
        case 'products' :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = true
          self.signinisActive = false
          break
        case 'signin' :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = true
          break
        case 'home' :
          self.isHomepage = true
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = false
          break
        default :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = false
          break
      }
    },
    navBarchange () {
      const self = this
      const pageScroll = window.scrollY

      $('.navBar').each(function () {
        if (pageScroll > 10) {
          self.isPageover10px = true
        } else {
          self.isPageover10px = false
        }
      })
    },
    onloadTopmenu () {
      const self = this

      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('\/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))

      switch (addrLast) {
        case 'about' :
          self.isHomepage = false
          self.aboutisActive = true
          self.productsisActive = false
          self.signinisActive = false
          break
        case 'products' :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = true
          self.signinisActive = false
          break
        case 'signin' :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = true
          break
        case 'home' :
          self.isHomepage = true
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = false
          break
        default :
          self.isHomepage = false
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = false
          break
      }
    }
  },
  created () {
    const self = this

    self.$bus.$on('getPathName', () => {
      self.onloadTopmenu()
    })

    self.$bus.$on('toWhere', (pathName) => {
      self.toWhere(pathName)
      self.menuActive()
    })

    window.addEventListener('scroll', this.navBarchange)
    window.addEventListener('load', this.onloadTopmenu)
  }
}
</script>
