<template>
    <div>

        <loading :active.sync="isLoading"></loading>

        <div class="cartIcon d-flex justify-content-center align-items-center" @click="cartIsActive = !cartIsActive">
            <i class="fas fa-shopping-cart text-primary">
                <h6><span class="badge" v-if="carts.length > 0"> {{ carts.length }} </span></h6>
            </i>
        </div>

        <div class="cartRight" :class="{'cartRightShow' : cartIsActive}">
            <div class="cartArea d-flex justify-content-center">
                <div class="cartItem">
                    <div class="cartCloseBtn" @click.prevent="cartIsActive = !cartIsActive">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                    <h2 class="h2 d-flex justify-content-center text-primary mt-5">C A R T</h2>

                    <div class="cartOutside">

                    <div class="d-flex justify-content-center"  v-if="carts.length === 0">
                    <vue-typer
                    :text='["購物車目前是空的唷" , "看看下面的商品如何？"]'
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

                    <table class="table" v-if="carts.length > 0">

                        <thead>
                            <tr class="bg-secondary text-white">
                                <th width="5%"></th>
                                <th class="cartImg" width="10%"></th>
                                <th>品名</th>
                                <th class="text-center" width="20%"> 數量 </th>
                                <th width="10%">金額</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in carts" :key="item.id">
                                <td class="d-flex justify-content-center pt-3 pl-3"> <a href="#" @click.prevent="delCart(item)"><i class="fas fa-trash"></i></a> </td>
                                <td class="cartImg text-center"> <img :src="item.product.imageUrl" alt="" width="40px" height="40px"> </td>
                                <td>
                                    {{ item.product.title }}
                                    <br>
                                    <br>
                                    <small class="text-white bg-primary" v-if="item.coupon"> 已套用優惠券 </small>
                                </td>
                                <td class="text-center"> {{ item.qty }} / {{ item.product.unit }} </td>
                                <td class="text-secondary text-right" v-if="!item.coupon"> {{ item.total | dollarSign}} </td>
                                <td class="text-primary text-right" v-if="item.coupon"> {{ item.final_total | dollarSign}} </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colspan="5">

                                    <div class="couponItem" v-if="carts.length > 0">
                                    <div class="d-flex justify-content-end mt-3 mb-3">
                                        <input type="text" placeholder="請輸入折價券" style="width : 40%" v-model="coupon.code" @keyup.enter="addCoupon">
                                        <button type="button" class="btn btn-primary text-white px-3 ml-1" @click.prevent="addCoupon" :class="{'pageDisabled' : !coupon.code}">
                                            <i class="fas fa-spinner fa-pulse" v-if="couponLoading"></i>
                                            套用折價券
                                        </button>
                                    </div>
                                    <div class="d-flex mb-2">
                                        <h3 class="d-flex align-self-center ml-auto h6 mr-5 text-secondary">總金額</h3>
                                        <span class="d-flex align-self-center h3 text-primary"> {{ finalTotal | dollarSign }} 元整</span>
                                    </div>
                                    <button type="button" class="btn btn-lg btn-primary text-white d-flex ml-auto" @click.prevent="toCheckout">結帳去</button>
                                    </div>

                                </td>
                            </tr>
                        </tfoot>

                    </table>

                    </div>

                        <h2 class="d-flex justify-content-center mt-5 h2 text-primary">- 推 薦 商 品 -</h2>

                        <div class="row">
                            <div class="col-lg-4" v-for="item in filterProducts" :key="item.id">
                                <div class="row h-100 d-flex justify-content-center">
                                    <div class="products-item p-1 my-2">

                                        <div class="col" @click.prevent="openProductModal(item)">
                                            <div class="d-flex justify-content-center">
                                            <img :src="item.imageUrl" alt="" width="70%" height="200px">
                                            </div>
                                        </div>
                                        <div class="col px-4">
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

                </div>
            </div>
        </div>

                <!-- 產品modal -->
        <div class="modal fade" id="cartProductmodal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content product-item-modal">
            <div class="modal-body">
                    <button type="button" class="close product-item-close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                    </button>
                <div class="row">
                    <div class="col-lg-5 d-flex justify-content-center">
                        <div>
                            <img :src="tempProduct.imageUrl" class="d-block model-img" width="100%" height="400px" alt="...">
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
                        <h2 class="h3 text-primary mb-2"> {{ tempProduct.title }} </h2>
                        <p class="h6 text-secondary my-3 px-2"> {{ tempProduct.description }} </p>
                        <p class="text-white d-inline px-3 h3 bg-primary">產 品 介 紹</p>
                        <p class="h6 text-secondary mt-1 lh-global mb-5"> {{ tempProduct.content }} </p>
                        <h3 class="text-white d-inline px-3 h3 bg-primary">購 買 前 須 知</h3>
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
                        <h4 class="text-secondary h6 mt-4">選購商品加入購物車→結帳付款(期限內繳款完畢)→等待追加7-21工作天→出貨通知(2-3日取貨)</h4>
                        <ul class="mt-4 text-secondary">
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
      carts: [],
      products: [],
      tempProduct: {},
      finalTotal: 0,
      coupon: {
        code: ''
      },
      totalPrice: '',
      cartIsActive: false,
      isLoading: false,
      productsIsLoading: false,
      addToCartLoading: false,
      couponLoading: false

    }
  },
  methods: {
    getCart () {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart`

      self.$http.get(api).then((res) => {
        self.isLoading = false
        if (res.data.success) {
          self.carts = res.data.data.carts
          self.totalPrice = res.data.data.total
          self.finalTotal = res.data.data.final_total
        }
      })
    },
    delCart (item) {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart/${item.id}`

      self.isLoading = true
      self.$http.delete(api).then((res) => {
        self.$noty.warning(item.product.title + res.data.message)
        self.getCart()
        self.$bus.$emit('updateCheckout')
      })
    },
    getProducts () {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/products/all`

      self.$http.get(api).then((res) => {
        if (res.data.success) {
          self.products = res.data.products
          self.productsIsLoading = true
        } else {
          alert('商品載入錯誤')
          self.$router.push('home')
        }
      })
    },
    addToCart (item, qty = 1) {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart`

      self.tempProduct = item

      const cart = {
        product_id: item.id,
        qty
      }

      self.addToCartLoading = true
      self.$http.post(api, { data: cart }).then((res) => {
        self.tempProduct = {}
        if (res.data.message === '已加入購物車') {
          $('#cartProductmodal').modal('hide')

          self.addToCartLoading = false
          self.$noty.success(res.data.message)
          self.$bus.$emit('updateCart')
          self.$bus.$emit('updateCheckout')
        } else {
          self.$noty.error(res.data.message)
        }
      })
    },
    openProductModal (item) {
      const self = this

      self.tempProduct = Object.assign({}, item)
      self.tempProduct.num = 1

      $('#cartProductmodal').modal('show')
    },
    closeModal () {
      const self = this

      self.tempProduct = {}
      self.addToCartLoading = false

      $('#cartProductmodal').modal('hide')
    },
    addCoupon () {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/coupon`

      self.couponLoading = true
      self.$http.post(api, { data: self.coupon }).then((res) => {
        self.couponLoading = false

        if (res.data.success) {
          self.$noty.success(res.data.message)
          self.coupon.code = ''
          self.getCart()
          self.$bus.$emit('updateCheckout')
        } else {
          self.$noty.error(res.data.message)
        }
      })
    },
    toCheckout () {
      const self = this

      self.cartIsActive = false
      self.$router.push('checkout')
      setTimeout(() => {
        self.$bus.$emit('getPathName')
      }, 10)
    }
  },
  computed: {
    filterProducts () {
      const self = this

      return self.products.filter((item) => {
        return item.price < 5000
      })
    }
  },
  created () {
    const self = this

    self.getProducts()
    self.getCart()
    self.$bus.$on('updateCart', () => {
      self.getCart()
    })

    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  }
}
</script>
