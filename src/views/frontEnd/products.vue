<template>
    <div>

        <!-- loading效果 -->
        <loading :active.sync="isLoading"></loading>
        <!--  -->

        <!-- 過場動畫 -->
        <section>

        <div class="curtain" :class="{'curtainShow' : productsIsLoading}"></div>

        <div class="rightCurtain1"></div>
        <div class="rightCurtain2"></div>

        </section>
        <!--  -->

        <!-- 產品區banner -->
        <section>
            <div class="container">

                <div class="product-banner-border">
                <div class="products-banner">

                    <vue-typer
                    :text='["不斷突破光學極限","只為了登峰造極"]'
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
                    class="h2 product-title"
                    ></vue-typer>

                </div>

                </div>

            </div>
        </section>
        <!--  -->

        <!-- 產品列表 -->
        <section>

            <div class="container-fluid mt-3">

            <div class="row">
                <div class="col-md-3">
                <div class="sticky-top">
                    <div class="d-flex justify-content-center">
                        <div class="card sideMenu w-100 bg-light border-0">
                            <div class="card-body">
                                <ul>
                                    <li><a href="#" class="h5" @click.prevent="selected = ''" :class="{'sideMenuActive' : selected === ''}">全部商品</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '相機'" :class="{'sideMenuActive' : selected === '相機'}">相機類</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '鏡頭'" :class="{'sideMenuActive' : selected === '鏡頭'}">鏡頭類</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '保護鏡'" :class="{'sideMenuActive' : selected === '保護鏡'}">濾鏡類</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '攝影包'" :class="{'sideMenuActive' : selected === '攝影包'}">攝影包</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '腳架'" :class="{'sideMenuActive' : selected === '腳架'}">腳架類</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '記憶卡'" :class="{'sideMenuActive' : selected === '記憶卡'}">記憶卡</a></li>
                                    <li><a href="#" class="h5" @click.prevent="selected = '清潔用品/防潮箱'" :class="{'sideMenuActive' : selected === '清潔用品/防潮箱'}">清潔用品/防潮箱</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div class="col-md-9 mb-5">

                    <div class="row">
                    <div class="col-lg-4 pt-4" v-for="item in updateProducts" :key="item.id">
                    <div class="row h-100 d-flex justify-content-center pt-5">
                        <div class="products-item px-3 mt-2">

                            <div class="col" @click.prevent="openProductModal(item)">
                                <div class="d-flex justify-content-center">
                                <img :src="item.imageUrl" alt="" width="80%" height="200px">
                                </div>
                            </div>
                            <div class="col px-2">
                                <div>
                                    <h2 class="h5 text-primary my-3 titleEllipsis" @click.prevent="openProductModal(item)"> {{ item.title }} </h2>
                                    <span class="ellipsis" @click.prevent="openProductModal(item)"> {{ item.description }} </span>
                                </div>
                                <div class="my-3 d-flex">
                                    <del class="h5 mr-auto align-self-center" @click.prevent="openProductModal(item)"> {{ item.origin_price | dollarSign }} </del>
                                    <small class="text-danger h5 align-self-center" @click.prevent="openProductModal(item)"> {{ item.price | dollarSign }} </small>
                                    <button class="btn btn-primary text-white ml-3" @click.prevent="addToCart(item)">
                                        <i class="fas fa-spinner fa-pulse" v-if="item.id === tempProduct.id"></i>
                                        <i class="fas fa-cart-arrow-down" v-if="item.id !== tempProduct.id"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
                    </div>

                    <div class="d-flex justify-content-center my-5" v-if="!pageHide">
                    <ul class="pagination">
                        <li><span><a href="#" @click.prevent="toPage(pages.current_page - 1)" :class="{'pageDisabled' : !pages.has_pre}">⬅</a></span></li>
                        <li v-for="item in pages.total_pages" :key="item.id" :class="{'pageActive' : pages.current_page === item}"><a href="#" @click.prevent="toPage(item)" :class="{'text-white' : pages.current_page === item}"> {{ item }} </a></li>
                        <li><span><a href="#" @click.prevent="toPage(pages.current_page + 1)" :class="{'pageDisabled' : !pages.has_next}">➡</a></span></li>
                    </ul>
                    </div>

                </div>
            </div>

            </div>

        </section>
        <!--  -->

        <!-- 產品modal -->
        <div class="modal fade" id="productModal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content product-item-modal">
            <div class="modal-body">
                    <button type="button" class="close product-item-close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                    </button>
                <div class="row">
                    <div class="col-lg-5 d-flex justify-content-center">
                        <div>
                            <img :src="tempProduct.imageUrl" class="d-block model-img" width="100%" height="450px" alt="...">
                            <div class="align-self-end my-4">
                            <div class="d-flex justify-content-end my-3">
                                <del class="h5 text-secondary mr-5 d-flex align-self-center">原價 {{ tempProduct.origin_price * tempProduct.num | dollarSign }} </del>
                                <span class="h2 text-primary"> {{ tempProduct.price * tempProduct.num | dollarSign }} </span>
                            </div>
                            <div class="d-flex">
                            <select v-model="tempProduct.num" class="w-50">
                                <option :value="item" v-for="item in 5" :key="item.id">選購 {{ item }} {{ tempProduct.unit }} </option>
                            </select>
                            <button type="button" class="btn btn-primary text-white w-50 ml-3" @click="addToCart(tempProduct , tempProduct.num)">
                                <i class="fas fa-spinner fa-pulse" v-if="addToCartLoading"></i>
                                加入購物車</button>
                            </div>
                            </div>
                            </div>
                    </div>
                    <div class="col-lg-7 mt-3 px-5 product-content">
                        <h2 class="h2 text-primary mb-2"> {{ tempProduct.title }} </h2>
                        <p class="h6 text-secondary my-4 px-2"> {{ tempProduct.description }} </p>
                        <p class="text-white d-inline px-3 h3 bg-primary">產品介紹</p>
                        <p class="h6 text-secondary mt-1 lh-global mb-5"> {{ tempProduct.content }} </p>
                        <h3 class="text-white d-inline px-3 h3 bg-primary"> 購 買 前 須 知  </h3>
                        <ul class="mt-4 text-secondary">
                            <li class="mb-4">本賣場販售「現貨」&「追加」商品，追加款需追加7-21個工作天，工作天不包含假日，不能等待請勿下單。</li>
                            <li class="mb-4">下單就會進行追加，下單後不接受隨意取消訂單!!!（超過追加期除外）</li>
                            <li class="mb-4">若商品有瑕疵或寄錯問題請於24小時內私訊客服，有分尺寸商品若不合可以辦理換貨（來回運費需自付）</li>
                            <li class="mb-4">不接受因個人因素(色差.不喜歡.不適合等問題)退貨，詳情請點 : 退換貨政策</li>
                            <li class="mb-4">商品頁面皆提供尺寸表，請下單前仔細測量再下單，客服僅提供"建議尺寸"，但決定權在消費者。</li>
                            <li class="mb-4">隨意棄單或無故未取包裹一律加入黑名單，若有任何問題都可以私訊客服。</li>
                            <li class="mb-4">特價商品皆屬特賣，售出不做退換貨請見諒。</li>
                        </ul>
                        <h3 class="text-white d-inline px-3 h3 bg-primary">購 物 流 程</h3>
                        <ul class="mt-4 text-secondary">
                            <li class="mb-4">選購商品加入購物車→結帳付款(期限內繳款完畢)→等待追加7-21工作天→出貨通知(2-3日取貨)</li>
                            <li class="mb-4">匯款完畢請務必至訂單內容留言匯款資訊(日期/金額/後五碼)</li>
                            <li class="mb-4">下單記得登入會員，才會收到出貨的mail通知唷~</li>
                        </ul>
                        <h3 class="text-white d-inline px-3 h3 bg-primary">付 款 方 式</h3>
                        <ul class="mt-4 text-secondary">
                            <li class="mb-4">線上刷卡</li>
                            <li class="mb-4">貨到付款</li>
                            <li class="mb-4">ATM轉帳</li>
                        </ul>
                        <h3 class="text-white d-inline px-3 h3 bg-primary">注 意 事 項</h3>
                        <ul class="mt-4 text-secondary">
                            <li class="mb-4">請勿濫用七天鑑賞期，下單前請務必三思並詳閱退換貨政策，勿衝動購買。</li>
                            <li class="mb-4">若尺寸不合提供一次更換尺寸的服務（自行負擔來回運費）</li>
                        </ul>
                        <h2 class="h6 text-danger mt-5">《購買前請先詳細閱讀以上事項,購買商品視同100%同意內容》</h2>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!--  -->

    </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      allProducts: [],
      products: [],
      tempProduct: {},
      productsIsLoading: false,
      addToCartLoading: false,
      selected: '',
      pages: {},
      isLoading: false,
      pageHide: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const self = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products/all`
      const api2 = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products?page=${page}`

      self.$http.get(api).then((res) => {
        if (res.data.success) {
          self.allProducts = res.data.products
          self.productsIsLoading = true
        } else {
          alert('商品載入錯誤')
          self.$router.push('home')
        }
      })

      self.$http.get(api2).then((res) => {
        if (res.data.success) {
          self.products = res.data.products
          self.pages = res.data.pagination
        } else {
          alert('商品載入錯誤')
        }
      })
    },
    toPage (page) {
      const self = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/products?page=${page}`

      self.isLoading = true
      self.pageHide = false
      self.$http.get(api).then((res) => {
        self.isLoading = false

        if (res.data.success) {
          self.products = res.data.products
          self.pages = res.data.pagination
          document.body.scrollTop = 650
          document.documentElement.scrollTop = 650
        } else {
          alert('商品載入失敗')
        }
      })
    },
    openProductModal (item) {
      const self = this

      self.tempProduct = Object.assign({}, item)
      self.tempProduct.num = 1

      $('#productModal').modal('show')
    },
    closeModal () {
      const self = this

      self.tempProduct = {}
      self.addToCartLoading = false

      $('#productModal').modal('hide')
    },
    addToCart (item, qty = 1) {
      const self = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`

      self.tempProduct = item

      const cart = {
        product_id: item.id,
        qty
      }

      self.addToCartLoading = true
      self.$http.post(api, { data: cart }).then((res) => {
        self.tempProduct = {}
        if (res.data.message === '已加入購物車') {
          $('#productModal').modal('hide')

          self.addToCartLoading = false
          self.$noty.success(res.data.message)
          self.$bus.$emit('updateCart')
        } else {
          self.$noty.error(res.data.message)
        }
      })
    }

  },
  computed: {
    updateProducts (page = 1) {
      const self = this

      if (self.selected === '') {
        self.pageHide = false
        return self.products
      } else {
        self.pageHide = true
        return self.allProducts.filter((item) => (item.category === self.selected))
      }
    }
  },
  created () {
    const self = this

    self.getProducts()
    self.$bus.$on('getProducts', (selected) => {
      self.selected = selected
    })

    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  }
}
</script>
