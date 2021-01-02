<template>

    <div>
        <!-- 過場動畫 -->
        <section>

        <div class="curtain"></div>

        <div class="rightCurtain1"></div>
        <div class="rightCurtain2"></div>

        </section>
        <!--  -->

        <!-- home頁面橫幅 -->
        <section>

            <div class="banner d-flex align-items-center">

                <div class="bannerTitle">
                    <h2 class="h1 text-primary">拍謝</h2>
                    <h3 class="h1 text-white">對於影像設備</h3>
                    <h3 class="h1 text-white">我們從不馬虎</h3>
                </div>

            </div>

        </section>
        <!--  -->

        <!-- content內容 -->
        <section>

            <div class="content my-5">
            <div class="container">

                <div class="row d-flex flex-row-reverse my-5 preFadein">
                    <div class="col-md-6 my-auto">
                        <div>
                        <h3 class="text-primary h2 mb-4">
                            你懂保護鏡 保護鏡就會幫你
                        </h3>
                        <p class="h6 text-secondary lh-global">
                            UV 保護鏡能過濾掉空氣中散射的紫外線，避免影響 CCD 或 CMOS 影像處理器而造成畫面的色偏或翳霧。光學品質好的濾鏡才能將鏡頭表現發揮到極致，並且帶給鏡頭絕佳的保護，阻隔鏡頭表面與外界灰塵微粒的接觸，緩衝外力及各種意外狀況對鏡頭的撞擊，進而延長鏡頭壽命。
                        </p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img src="@/assets/img/lens.jpg" alt="照相機 鏡頭" title="圖片源自 Unsplash">
                    </div>
                </div>

                <div class="row preFadein">
                    <div class="col-md-6 my-auto">
                        <h3 class="text-primary h2 mb-4">
                            好的腳架 比你想像的更加持久
                        </h3>
                        <p class="h6 text-secondary lh-global">
                            三腳架可以算是攝影者必需品之一，但往往是最容易被人忽略的。大多數人認為有防震相機,高感光度就不用三腳架，其實並非完全正確。無論你是風景、人像，甚至是生態攝影，想提升相片的質素，一支穩定的腳架遠比一支防震的鏡頭更為重要。況且如果你需要用慢快門呈現夜間的車流線，或是瀑布的表現，沒有腳架是沒辦法呈現的，而且一支好的腳架，真的是可以用上10年或以上，所以投資一支好的腳架是絕對值得的。
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="@/assets/img/tripod.jpg" alt="照相機 腳架" title="圖片源自 Unsplash">
                    </div>
                </div>

            </div>
            </div>

        </section>
        <!--  -->

        <section>
            <div class="container mb-5 preFadein">
                <div class="row">
                    <div class="col-md-4 home-product-item-shell p-3" @click.prevent="toProducts('攝影包')">
                        <div class="home-product-item home-product-item-img1 d-flex justify-content-center align-items-center">
                            <h2 class="h2 text-primary">找包？</h2>
                        </div>
                    </div>
                    <div class="col-md-4 home-product-item-shell p-3" @click.prevent="toProducts('鏡頭')">
                        <div class="home-product-item home-product-item-img2 d-flex justify-content-center align-items-center">
                            <h2 class="h2 text-primary">找鏡頭？</h2>
                        </div>
                    </div>
                    <div class="col-md-4 home-product-item-shell p-3" @click.prevent="toProducts('腳架')">
                        <div class="home-product-item home-product-item-img3 d-flex justify-content-center align-items-center">
                            <h2 class="h2 text-primary">找腳架？</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- home下方video橫幅 -->
        <section>

            <div class="videoBanner">
            <video-bg :sources="['https://assets.mixkit.co/videos/preview/mixkit-man-walking-along-an-old-narrow-alley-tracking-27238-large.mp4']" class="preFadein">

            <div class="videoTitle">

            <vue-typer
            :text='[" 準備好裝備了嗎?","帶上我們提供的設備","去探索世界每個角落"]'
            :repeat='Infinity'
            :shuffle='false'
            initial-action='typing'
            :pre-type-delay='300'
            :type-delay='200'
            :pre-erase-delay='3000'
            :erase-delay='150'
            erase-style='backspace'
            :erase-on-complete='false'
            caret-animation='blink'
            class="h2"
            ></vue-typer>

            </div>

            </video-bg>
            </div>

        </section>
        <!--  -->

        <!-- 訂閱我們以及手機model -->
        <section>

            <div class="container my-5">
                <div class="row preFadein">

                    <div class="col-lg-6 d-flex justify-content-center align-items-center">
                        <div>
                        <div class="phoneAreaText">
                            <h3 class="h1 text-primary">訂閱我們吧 !!</h3>
                            <p class="h4 text-secondary my-3">現在訂閱 馬上享9折優惠</p>
                            <p class="h4 text-secondary">我們會於每月10號寄送95折優惠券</p>
                        </div>
                        </div>
                    </div>

                    <div class="col-lg-6 d-flex justify-content-center my-5">
                        <div class="phoneCase preShake">
                            <div class="phoneScreen">
                                <div class="phonePage1 preFadeinRight">
                                    <div class="text-center">
                                    <img src="@/assets/img/email.svg" alt="email icon">
                                    <br>
                                    <h3 class="h4 text-secondary mt-3">請輸入您的電子信箱</h3>

                                    <validation-observer v-slot="{ invalid }">
                                    <form @submit.prevent="showPhonePage2">
                                    <validation-provider rules="required|email" v-slot="{ errors , classes }">
                                    <input type="email" v-model="emailAddress" :class="classes" name="電子信箱">
                                    <span class="invalid-feedback"> {{ errors[0] }}唷 </span>
                                    </validation-provider>

                                    <button type="submit" class="btn-primary text-white mt-3 ml-auto" :disabled="invalid">送出</button>
                                    </form>
                                    </validation-observer>
                                    </div>
                                </div>
                                <div class="phonePage2">
                                    <div class="text-center">
                                    <img src="@/assets/img/thank-you.svg" alt="thank you">
                                    </div>
                                    <h3 class="h2 text-secondary">感謝您的訂閱</h3>
                                    <p class="h5 text-secondary my-4">您的專屬9折優惠碼↓↓↓</p>
                                    <p class="h2 text-primary couponCode">10off_sale</p>
                                </div>
                            </div>
                            <div class="topCamera"></div>
                            <div class="phoneBottomLine"></div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
        <!--  -->

    </div>

</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      emailAddress: ''
    }
  },
  methods: {
    openPage () {
      setTimeout(() => {
        $('.curtain').addClass('curtainShow')
      }, 5)
    },
    addAnimate () {
      const scrollPos = $(window).scrollTop()
      const windowHeight = $(window).height()

      $('.preFadein').each(function () {
        const itemPos = $(this).offset().top

        if ((scrollPos + windowHeight) > (itemPos + 100)) {
          $(this).addClass('fadeIn')
        }
      })

      $('.preFadeinRight').each(function () {
        const itemPos = $(this).offset().top

        if ((scrollPos + windowHeight) > (itemPos + 100)) {
          $(this).addClass('fadeIn')
        }
      })

      $('.preFadeinLeft').each(function () {
        const itemPos = $(this).offset().top

        if ((scrollPos + windowHeight) > (itemPos + 100)) {
          $(this).addClass('fadeIn')
        }
      })

      $('.preShake').each(function () {
        const itemPos = $(this).offset().top

        if ((scrollPos + windowHeight) > (itemPos + 150)) {
          $(this).addClass('shake')
        }
      })
    },
    showPhonePage2 () {
      $('.phonePage2').addClass('fadeIn')
    },
    toProducts (selected) {
      const self = this

      self.$bus.$emit('toWhere', 'products')

      setTimeout(() => {
        self.$router.push('/products')
      }, 1000)
      setTimeout(() => {
        self.$bus.$emit('getProducts', selected)
        self.$bus.$emit('getPathName')
      }, 1100)
      setTimeout(() => {
        document.body.scrollTop = 500
        document.documentElement.scrollTop = 500
      }, 1210)
    }
  },
  created () {
    this.openPage()
    window.addEventListener('scroll', this.addAnimate)
  }
}
</script>
