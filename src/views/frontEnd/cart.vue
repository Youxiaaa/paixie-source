<template>
    <div>

      <loading :active.sync="isLoading"></loading>

      <div class="cartIcon d-flex justify-content-center align-items-center" @click="cartIsActive = !cartIsActive">
        <i class="fas fa-shopping-cart text-primary">
          <h6><span class="badge" v-if="cartsData.length > 0"> {{ cartsData.length }} </span></h6>
        </i>
      </div>

      <div class="cartRight" :class="{'cartRightShow' : cartIsActive}">
        <div class="cartArea d-flex justify-content-center">
          <div class="container cartItem">
            <div class="cartCloseBtn" @click.prevent="cartIsActive = !cartIsActive">
                <i class="fas fa-chevron-right"></i>
            </div>
            <h2 class="h2 d-flex justify-content-center text-primary my-5" v-if="cartsData.length !== 0">購 物 車</h2>

            <div class="d-flex justify-content-center my-5 pt-5" v-if="cartsData.length === 0">
            <vue-typer
            :text='["購物車目前是空的唷" , "點擊下方去看看新品吧"]'
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
            class="h3 typerColor"
            ></vue-typer>
            </div>

            <div class="cartOutside" v-if="cartsData.length > 0">
            <div class="d-flex justify-content-center mb-3" v-if="cartsData.length !== 0 && totalPrice && totalPrice > 1000000">
              <span class="text-primary">單筆訂單金額上限為100萬元 超過100萬元仍需購買者請與我們聯絡</span>
            </div>

            <table class="table computerSizeTable" v-if="cartsData.length > 0">

                <thead>
                  <tr class="bg-secondary text-white">
                    <th width="5%"></th>
                    <th class="cartImg" width="10%"></th>
                    <th>品名</th>
                    <th class="text-center" width="15%"> 數量 </th>
                    <th width="10%">金額</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in cartsData" :key="item.id">
                    <td class="d-flex justify-content-center pt-3 pl-3"> <a href="#" @click.prevent="delCart(item)"><i class="fas fa-trash"></i></a> </td>
                    <td class="cartImg text-center"> <img :src="item.imageUrl" alt="" width="40px" height="40px"> </td>
                    <td>
                      <span class="text-secondary"> {{ item.title }} </span>
                    </td>
                    <td class="text-center">
                    <div class="btn-group">
                      <button class="btn btn-primary text-white" :class="{'pageDisabled': item.qty <= 1}" @click.prevent='onMinus(item)'> - </button>
                      <input type="number" :value="item.qty" min="1" max="10" disabled class="text-center">
                      <button class="btn btn-primary text-white" :class="{'pageDisabled': totalPrice > 1000000}" @click.prevent="onPlus(item)"> + </button>
                    </div>
                    <br>
                    </td>
                    <td class="text-primary text-right"> {{ item.price * item.qty | dollarSign}} </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr>
                    <td colspan="5">
                      <div class="couponItem" v-if="cartsData.length > 0">
                      <div class="d-flex mb-2">
                        <h3 class="d-flex align-self-center ml-auto h6 mr-5 text-secondary">總金額</h3>
                        <span class="d-flex align-self-center h3 text-primary"> {{ totalPrice | dollarSign }} 元整</span>
                      </div>
                      <button type="button" class="btn btn-lg btn-primary text-white d-flex ml-auto" @click.prevent="toCheckout">結帳去</button>
                      </div>
                    </td>
                  </tr>
                </tfoot>

            </table>

            <table class="table phoneSizeTable" v-if="cartsData.length > 0">

                <thead>
                  <tr class="bg-secondary text-white">
                    <th colspan="3">購物車資訊</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="item in cartsData" :key="item.id">
                    <td class="d-flex justify-content-center pt-3 pl-3"> <a href="#" @click.prevent="delCart(item)"><i class="fas fa-trash"></i></a> </td>
                    <td class="cartImg text-center"> <img :src="item.imageUrl" alt="" width="40px" height="40px"> </td>
                    <td>
                      <span class="h6 mb-2 text-secondary"> {{ item.title }} </span>
                      <br>
                      <span class="text-primary"> {{ item.price * item.qty | dollarSign}} </span>
                      <br>
                      <div class="btn-group mt-2">
                        <button class="btn btn-primary text-white" :class="{'pageDisabled': item.qty <= 1}" @click.prevent='onMinus(item)'> - </button>
                        <input type="number" :value="item.qty" min="1" max="10" disabled class="text-center">
                        <button class="btn btn-primary text-white" :class="{'pageDisabled': totalPrice > 1000000}" @click.prevent="onPlus(item)"> + </button>
                      </div>
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="5">
                          <div class="couponItem" v-if="cartsData.length > 0">
                          <div class="d-flex mb-2">
                            <h3 class="d-flex align-self-center ml-auto h6 mr-5 text-secondary">總金額</h3>
                            <span class="d-flex align-self-center h4 text-primary"> {{ totalPrice | dollarSign }} 元整</span>
                          </div>
                            <button type="button" class="btn btn-lg btn-primary text-white d-flex ml-auto" @click.prevent="toCheckout">結帳去</button>
                          </div>
                        </td>
                    </tr>
                </tfoot>

            </table>

            </div>

              <div class="cartBanner" v-if="cartsData.length === 0">
                <button type="button" @click.prevent="toProductsPage">前 往 商 品 頁</button>
              </div>
              <h2 class="d-flex justify-content-center my-5 h2 text-primary" v-if="cartsData.length !== 0">推 薦 商 品</h2>

              <div class="row" v-if="cartsData.length !== 0">
                <div class="col-md-4 pt-4 px-0" v-for="item in products" :key="item.id">
                  <div class="products-item px-3 mt-2 d-flex flex-column h-100">
                    <div class="d-flex justify-content-center" @click.prevent="openProductModal(item)">
                    <img :src="item.imageUrl" alt="" height="180px">
                    </div>
                    <div @click="openProductModal(item)" class="my-2">
                      <h2 class="h5 text-primary mt-2 titleEllipsis"> {{ item.title }} </h2>
                      <span class="ellipsis"> {{ item.description }} </span>
                    </div>
                    <div class="my-3 d-flex mt-auto" @click="openProductModal(item)">
                      <del class="h5 mr-auto align-self-center"> {{ item.origin_price | dollarSign }} </del>
                      <small class="text-danger h5 align-self-center"> {{ item.price | dollarSign }} </small>
                    </div>
                      <button class="btn btn-primary text-white py-2 mb-3" @click.prevent="addToCart(item)">加入購物車</button>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>

      <!-- 產品modal -->
      <div class="modal fade" id="cartProductmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
          <div class="modal-content product-item-modal">
          <div class="modal-body">
              <button type="button" class="close product-item-close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row">
                <div class="col-xl-5 d-flex flex-column">
                  <img :src="tempProduct.imageUrl" class="d-flex mx-auto mt-auto model-img" height="350px" alt="...">
                  <h2 class="h3 text-primary mt-auto px-3"> {{ tempProduct.title }} </h2>
                  <p class="h6 text-secondary my-3 px-3"> {{ tempProduct.description }} </p>
                  <div class="d-flex justify-content-end">
                    <del class="h5 text-secondary mr-5 d-flex align-self-center">原價 {{ tempProduct.origin_price * tempProduct.num | dollarSign }} </del>
                    <span class="h2 text-primary"> {{ tempProduct.price * tempProduct.num | dollarSign }} </span>
                  </div>
                  <div class="d-flex">
                  <select v-model="tempProduct.num" class="w-50">
                    <option :value="item" v-for="item in 5" :key="item.id">選購 {{ item }} {{ tempProduct.unit }} </option>
                  </select>
                  <button type="button" class="btn btn-primary text-white w-50 ml-3" @click.prevent="addToCart(tempProduct, tempProduct.num)">
                    加入購物車</button>
                  </div>
                </div>
                  <div class="col-xl-7 mt-3 px-2 product-content">
                    <p class="text-white d-inline px-3 h3 bg-primary">產 品 介 紹</p>
                    <p class="h6 text-secondary mt-1 lh-global my-4"> {{ tempProduct.content }} </p>
                    <h3 class="text-white d-inline px-3 h3 bg-primary">購 買 前 須 知</h3>
                    <ul class="mt-4 text-secondary pl-0">
                      <li class="mb-4 list-unstyled">本賣場販售「現貨」&「追加」商品，追加款需追加7-21個工作天，工作天不包含假日，不能等待請勿下單。</li>
                      <li class="mb-4 list-unstyled">下單就會進行追加，下單後不接受隨意取消訂單!!!（超過追加期除外）</li>
                      <li class="mb-4 list-unstyled">若商品有瑕疵或寄錯問題請於24小時內私訊客服，有分尺寸商品若不合可以辦理換貨（來回運費需自付）</li>
                      <li class="mb-4 list-unstyled">不接受因個人因素(色差.不喜歡.不適合等問題)退貨，詳情請點 : 退換貨政策</li>
                      <li class="mb-4 list-unstyled">商品頁面皆提供尺寸表，請下單前仔細測量再下單，客服僅提供"建議尺寸"，但決定權在消費者。</li>
                      <li class="mb-4 list-unstyled">隨意棄單或無故未取包裹一律加入黑名單，若有任何問題都可以私訊客服。</li>
                      <li class="mb-4 list-unstyled">特價商品皆屬特賣，售出不做退換貨請見諒。</li>
                    </ul>
                    <h3 class="text-white d-inline px-3 h3 bg-primary">購 物 流 程</h3>
                    <h4 class="text-secondary h6 mt-4">選購商品加入購物車→結帳付款(期限內繳款完畢)→等待追加7-21工作天→出貨通知(2-3日取貨)</h4>
                    <ul class="mt-4 text-secondary pl-0">
                      <li class="mb-4 list-unstyled">匯款完畢請務必至訂單內容留言匯款資訊(日期/金額/後五碼)</li>
                      <li class="mb-4 list-unstyled">下單記得登入會員，才會收到出貨的mail通知唷~</li>
                    </ul>
                    <h3 class="text-white d-inline px-3 h3 bg-primary">付 款 方 式</h3>
                    <ul class="mt-4 text-secondary pl-0">
                      <li class="mb-4 list-unstyled">線上刷卡</li>
                      <li class="mb-4 list-unstyled">貨到付款</li>
                      <li class="mb-4 list-unstyled">ATM轉帳</li>
                    </ul>
                    <h3 class="text-white d-inline px-3 h3 bg-primary">注 意 事 項</h3>
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
      <!--  -->

    </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      carts: [],
      products: [],
      tempProduct: {},
      finalTotal: 0,
      cartIsActive: false,
      isLoading: false,
      productsIsLoading: false,
      addToCartLoading: false,
      cartsData: JSON.parse(localStorage.getItem('cartsData')) || []
    }
  },
  methods: {
    delCart (cart) {
      const vm = this
      vm.cartsData.filter((item, key) => {
        if (item.product_id === cart.product_id) {
          vm.cartsData.splice(key, 1)
          localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
          vm.$noty.warning(`${cart.title} 已移除購物車`)
        }
      })
    },
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products/all`

      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          const cacheProducts = []
          res.data.products.forEach((item) => {
            if (item.price < 5000) {
              cacheProducts.push(item)
            }
            vm.products = cacheProducts
          })
          vm.productsIsLoading = true
        } else {
          vm.$router.push('home')
        }
      })
    },
    addToCart (product, qty = 1) {
      const vm = this
      const cacheId = []

      vm.cartsData.forEach((item) => {
        cacheId.push(item.product_id)
      })

      if (cacheId.indexOf(product.id) === -1) {
        const cartContent = {
          product_id: product.id,
          qty: qty,
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          content: product.content
        }
        vm.cartsData.push(cartContent)
        localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
        vm.$noty.success(`${product.title} 已加入購物車`)
        $('#cartProductmodal').modal('hide')
      } else {
        vm.cartsData.forEach((item, key) => {
          if (item.product_id === product.id) {
            let { qty } = item
            const cartContent = {
              product_id: product.id,
              qty: qty += 1,
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price,
              content: product.content
            }
            vm.cartsData.splice(key, 1)
            vm.cartsData.push(cartContent)
            localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
            vm.$noty.success(`${product.title} 已加入購物車`)
            $('#cartProductmodal').modal('hide')
          }
        })
      }
    },
    openProductModal (item) {
      const vm = this

      vm.tempProduct = { ...item }
      vm.tempProduct.num = 1

      $('#cartProductmodal').modal('show')
    },
    closeModal () {
      const vm = this

      vm.tempProduct = {}
      vm.addToCartLoading = false

      $('#cartProductmodal').modal('hide')
    },
    toCheckout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart`
      const cacheId = []
      let cacheData = []
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        cacheData = res.data.data.carts
        cacheData.forEach((item) => {
          cacheId.push(item.id)
        })
      }).then(() => {
        cacheId.forEach((item) => {
          vm.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart/${item}`)
        })
      }).then(() => {
        vm.cartsData.forEach((item) => {
          const cache = {
            product_id: item.product_id,
            qty: item.qty
          }
          vm.$http.post(api, { data: cache }).then((res) => {
            vm.isLoading = false
            vm.cartIsActive = false
            vm.cartsData = []
            localStorage.removeItem('cartsData')
            vm.$router.push('checkout')
            vm.$bus.$emit('updateCheckout')
          })
        })
      })
    },
    updateCart (carts) {
      const vm = this
      vm.cartsData = carts
    },
    onPlus (item) {
      const vm = this
      vm.cartsData.filter((filterItem) => {
        if (filterItem.product_id === item.product_id) {
          filterItem.qty = filterItem.qty + 1
        }
        localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
      })
    },
    onMinus (item) {
      const vm = this
      if (item.qty <= 1) { return }
      vm.cartsData.filter((filterItem) => {
        if (filterItem.product_id === item.product_id) {
          filterItem.qty = filterItem.qty - 1
        }
        localStorage.setItem('cartsData', JSON.stringify(vm.cartsData))
      })
    },
    toProductsPage () {
      const vm = this
      vm.$bus.$emit('toWhere', 'products')
      setTimeout(() => {
        vm.cartIsActive = false
      }, 1000)
    }
  },
  computed: {
    filterProducts () {
      const vm = this

      return vm.products.filter((item) => {
        return item.price < 5000
      })
    },
    totalPrice () {
      const vm = this
      const price = []
      vm.cartsData.forEach((item) => {
        price.push(parseInt(item.price * item.qty))
      })
      return price.reduce(function (total, e) {
        return total + e
      })
    }
  },
  created () {
    const vm = this
    vm.getProducts()
    vm.$bus.$on('updateCart', (carts) => {
      vm.updateCart(carts)
    })
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  }
}
</script>
