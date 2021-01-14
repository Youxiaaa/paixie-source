<template>
    <div>

      <!-- loading效果 -->
      <loading :active.sync="isLoading"></loading>

      <!-- 過場動畫 -->
      <section>

      <div class="curtain" :class="{'curtainShow' : productsIsLoading}"></div>

      <div class="rightCurtain1"></div>
      <div class="rightCurtain2"></div>

      </section>

      <!-- 產品區banner -->
      <section>
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
      </section>

      <!-- 產品列表 -->
      <section>

        <div class="px-3 mt-3">

        <div class="container">
        <div class="row">
          <div class="col-lg-3">
          <div class="sticky-top">
            <div class="d-flex justify-content-center">
              <div class="card sideMenu w-100 bg-light border-0 mb-5">
                <div class="card-body">
                  <ul class="pl-0">
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = ''" :class="{'sideMenuActive' : selected === ''}">全部商品</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '相機'" :class="{'sideMenuActive' : selected === '相機'}">相機類</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '鏡頭'" :class="{'sideMenuActive' : selected === '鏡頭'}">鏡頭類</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '保護鏡'" :class="{'sideMenuActive' : selected === '保護鏡'}">濾鏡類</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '攝影包'" :class="{'sideMenuActive' : selected === '攝影包'}">攝影包</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '腳架'" :class="{'sideMenuActive' : selected === '腳架'}">腳架類</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '記憶卡'" :class="{'sideMenuActive' : selected === '記憶卡'}">記憶卡</a></li>
                    <li class="list-unstyled"><a href="#" class="h5" @click.prevent="selected = '清潔用品/防潮箱'" :class="{'sideMenuActive' : selected === '清潔用品/防潮箱'}">清潔用品/防潮箱</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div class="col-lg-9 my-5 pt-2 px-0">
            <div class="container">
              <div class="row">
              <div class="col-6 col-md-4 col-xl-3 pt-4 px-0" v-for="item in updateProducts" :key="item.id">
                <div class="products-item px-3 d-flex flex-column h-100">
                  <div class="d-flex justify-content-center" @click.prevent="openProductModal(item)">
                  <img :src="item.imageUrl" alt="" height="130px">
                  </div>
                  <div @click="openProductModal(item)" class="my-2 mt-auto">
                    <h2 class="h5 text-primary mt-2 titleEllipsis"> {{ item.title }} </h2>
                    <span class="ellipsis"> {{ item.description }} </span>
                  </div>
                  <div class="my-3 d-flex mt-auto" @click="openProductModal(item)">
                    <del class="h5 mr-auto align-self-center computer-item-price"> {{ item.origin_price | dollarSign }} </del>
                    <small class="text-danger h5 align-self-center computer-item-price"> {{ item.price | dollarSign }} </small>
                  </div>
                    <del class="h5 ml-auto phone-item-price" @click="openProductModal(item)"> NTD{{ item.origin_price | dollarSign }} </del>
                    <small class="text-danger ml-auto h5 phone-item-price" @click="openProductModal(item)"> NTD{{ item.price | dollarSign }} </small>
                    <button class="btn btn-primary text-white py-2 mb-3" @click.prevent="addToCart(item)">加入購物車</button>
                </div>
              </div>
              </div>
            </div>

            <pagination></pagination>

          </div>
        </div>
        </div>

        </div>

      </section>

      <!-- 產品modal -->
      <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content product-item-modal">
        <div class="modal-body">
          <button type="button" class="close product-item-close" data-dismiss="modal" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="row">
            <div class="col-xl-5 d-flex flex-column">
              <img :src="tempProduct.imageUrl" class="d-flex mx-auto mt-auto model-img" height="270px" alt="商品圖片">
              <h2 class="h3 text-primary mt-auto px-3 mt-auto"> {{ tempProduct.title }} </h2>
              <p class="h6 text-secondary my-4 px-3"> {{ tempProduct.description }} </p>
              <div class="d-flex justify-content-end">
                <del class="h5 text-secondary mr-5 d-flex align-self-center">原價 {{ tempProduct.origin_price * tempProduct.num | dollarSign }} </del>
                <span class="h2 text-primary"> {{ tempProduct.price * tempProduct.num | dollarSign }} </span>
              </div>
              <div class="d-flex">
              <select v-model="tempProduct.num" class="w-50">
                  <option :value="item" v-for="item in 5" :key="item.id">選購 {{ item }} {{ tempProduct.unit }} </option>
              </select>
              <button type="button" class="btn btn-primary text-white w-50 ml-3" @click.prevent="addToCart(tempProduct , tempProduct.num)">
                  加入購物車</button>
              </div>
            </div>
            <div class="col-xl-7 mt-3 px-5 product-content">
              <p class="text-white d-inline h2 text-primary">產品介紹</p>
              <p class="h6 text-secondary mt-1 lh-global my-4"> {{ tempProduct.content }} </p>
              <h3 class="text-white d-inline h2 text-primary"> 購 買 前 須 知  </h3>
              <ul class="mt-4 text-secondary pl-0">
                <li class="mb-4 list-unstyled">本賣場販售「現貨」&「追加」商品，追加款需追加7-21個工作天，工作天不包含假日，不能等待請勿下單。</li>
                <li class="mb-4 list-unstyled">下單就會進行追加，下單後不接受隨意取消訂單!!!（超過追加期除外）</li>
                <li class="mb-4 list-unstyled">若商品有瑕疵或寄錯問題請於24小時內私訊客服，有分尺寸商品若不合可以辦理換貨（來回運費需自付）</li>
                <li class="mb-4 list-unstyled">不接受因個人因素(色差.不喜歡.不適合等問題)退貨，詳情請點 : 退換貨政策</li>
                <li class="mb-4 list-unstyled">商品頁面皆提供尺寸表，請下單前仔細測量再下單，客服僅提供"建議尺寸"，但決定權在消費者。</li>
                <li class="mb-4 list-unstyled">隨意棄單或無故未取包裹一律加入黑名單，若有任何問題都可以私訊客服。</li>
                <li class="mb-4 list-unstyled">特價商品皆屬特賣，售出不做退換貨請見諒。</li>
              </ul>
              <h3 class="text-white d-inline h2 text-primary">購 物 流 程</h3>
              <ul class="mt-4 text-secondary pl-0">
                <li class="mb-4 list-unstyled">選購商品加入購物車→結帳付款(期限內繳款完畢)→等待追加7-21工作天→出貨通知(2-3日取貨)</li>
                <li class="mb-4 list-unstyled">匯款完畢請務必至訂單內容留言匯款資訊(日期/金額/後五碼)</li>
                <li class="mb-4 list-unstyled">下單記得登入會員，才會收到出貨的mail通知唷~</li>
              </ul>
              <h3 class="text-white d-inline h2 text-primary">付 款 方 式</h3>
              <ul class="mt-4 text-secondary pl-0">
                <li class="mb-4 list-unstyled">線上刷卡</li>
                <li class="mb-4 list-unstyled">貨到付款</li>
                <li class="mb-4 list-unstyled">ATM轉帳</li>
              </ul>
              <h3 class="text-white d-inline h2 text-primary">注 意 事 項</h3>
              <ul class="mt-4 text-secondary pl-0">
                <li class="mb-4 list-unstyled">請勿濫用七天鑑賞期，下單前請務必三思並詳閱退換貨政策，勿衝動購買。</li>
                <li class="mb-4 list-unstyled">若尺寸不合提供一次更換尺寸的服務（自行負擔來回運費）</li>
              </ul>
              <h2 class="h6 text-danger mt-5">《購買前請先詳細閱讀以上事項,購買商品視同100%同意內容》</h2>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>

    </div>
</template>

<script>

import $ from 'jquery'
import pagination from '@/components/Pagination.vue'

export default {
  components: {
    pagination
  },
  data () {
    return {
      allProducts: [],
      products: [],
      tempProduct: {},
      productsIsLoading: false,
      addToCartLoading: false,
      selected: '',
      isLoading: false,
      cartsData: JSON.parse(localStorage.getItem('cartsData')) || [],
      isClick: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products/all`
      const api2 = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products?page=${page}`

      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.allProducts = res.data.products
          vm.productsIsLoading = true
        } else {
          alert('商品載入錯誤')
          vm.$router.push('home')
        }
      })

      vm.$http.get(api2).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products
          vm.pages = res.data.pagination
          vm.$bus.$emit('updatePagination', res.data.pagination)
        } else {
          alert('商品載入錯誤')
        }
      })
    },
    toPage (page) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products?page=${page}`

      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.products = res.data.products
          vm.pages = res.data.pagination
          document.body.scrollTop = 500
          document.documentElement.scrollTop = 500
          vm.$bus.$emit('updatePagination', res.data.pagination)
        } else {
          alert('商品載入失敗')
        }
      })
    },
    openProductModal (item) {
      const vm = this

      vm.tempProduct = { ...item }
      vm.tempProduct.num = 1

      $('#productModal').modal('show')
    },
    closeModal () {
      const vm = this

      vm.tempProduct = {}
      vm.addToCartLoading = false

      $('#productModal').modal('hide')
    },
    addToCart (product, qty = 1) {
      const vm = this
      const cacheId = []

      if (vm.isClick === true) { return }

      vm.isClick = true
      setTimeout(() => {
        vm.isClick = false
      }, 1000)

      vm.cartsData.forEach((item) => {
        cacheId.push(item.product_id)
      })

      if (cacheId.indexOf(product.id) === -1) {
        const cartContent = {
          product_id: product.id,
          qty: qty,
          title: product.title,
          imageUrl: product.imageUrl,
          unit: product.unit,
          price: product.price,
          content: product.content
        }
        vm.cartsData.push(cartContent)
        localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
        this.$noty.success(`${product.title} 已加入購物車`)
        $('#productModal').modal('hide')
        vm.$bus.$emit('updateCart', vm.cartsData)
      } else {
        vm.cartsData.forEach((item, key) => {
          if (item.product_id === product.id) {
            let { qty } = item
            const cartContent = {
              product_id: product.id,
              qty: qty += 1,
              title: product.title,
              imageUrl: product.imageUrl,
              unit: product.unit,
              price: product.price,
              content: product.content
            }
            vm.cartsData.splice(key, 1)
            vm.cartsData.push(cartContent)
            localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
            vm.$noty.success(`${product.title} 已加入購物車`)
            $('#productModal').modal('hide')
            vm.$bus.$emit('updateCart', vm.cartsData)
          }
        })
      }
    }
  },
  computed: {
    updateProducts (page = 1) {
      const vm = this
      if (vm.selected === '') {
        vm.pageHide = false
        vm.$bus.$emit('pageHide', false)
        return vm.products
      } else {
        vm.pageHide = true
        vm.$bus.$emit('pageHide', true)
        return vm.allProducts.filter((item) => (item.category === vm.selected))
      }
    }
  },
  created () {
    const vm = this

    vm.getProducts()
    vm.$bus.$on('getProducts', (selected) => {
      vm.selected = selected
    })
    vm.$bus.$on('toPage', (page) => {
      vm.toPage(page)
    })
    vm.$bus.$emit('getPathName')

    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', () => history.pushState(null, null, document.URL))
  }
}
</script>
