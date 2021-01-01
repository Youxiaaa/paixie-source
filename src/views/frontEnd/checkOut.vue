<template>
    <div>

        <!-- 過場動畫 -->
        <section>

        <div class="rightCurtain1" :class="{'curtainShow' : isCheckout}"></div>
        <div class="rightCurtain2" :class="{'curtain2Show' : isCheckout}"></div>

        </section>
        <!--  -->

        <div class="d-flex justify-content-center mt-3 mb-2 pt-5" v-if="cartsLen !== 0">
        <h2 class="text-primary h2 mt-5">S T E P 1 . 填 寫 訂 單</h2>
        </div>

        <section v-if="cartsLen == 0">
            <div class="d-flex justify-content-center mt-5 py-5">
                <vue-typer
                :text='["購物車是空的唷" , "點擊下方看看商品如何"]'
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

            <div class="d-flex justify-content-center my-5 py-5">
                <a href="#" class="h2" @click="toProductsPage('products')">點我去看商品</a>
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            </div>
        </section>

        <!-- 填寫訂單區域 -->
        <section v-if="cartsLen !== 0">

            <div class="container my-4 pt-5">
                <div class="row">

                    <div class="col-md-7 px-5 bg-light">

                        <validation-observer v-slot="{ invalid }">
                            <form @submit.prevent="checkOut(payMethods)" class="mt-5">

                            <validation-provider rules="required" v-slot="{ errors , classes }">
                            <div class="form-group">
                            <label class="mb-2" for="name">姓名</label>
                            <input id="name" type="text" name="姓名" v-model="checkoutData.user.name"
                                class="form-control" :class="classes">
                            <span class="invalid-feedback"> {{ errors[0] }} </span>
                            </div>
                            </validation-provider>

                            <validation-provider rules="required|email" v-slot="{ errors , classes }">
                            <div class="form-group mt-3">
                            <label class="mb-2" for="email">電子信箱</label>
                            <input id="email" type="email" name="電子信箱" v-model="checkoutData.user.email"
                                class="form-control" :class="classes">
                            <span class="invalid-feedback"> {{ errors[0] }} </span>
                            </div>
                            </validation-provider>

                            <validation-provider rules="required|min:8" v-slot="{ errors , classes }">
                            <div class="form-group mt-3">
                            <label class="mb-2" for="tel">連絡電話</label>
                            <input id="tel" maxlength="10" type="tel" name="連絡電話" v-model="checkoutData.user.tel"
                                class="form-control" :class="classes">
                            <span class="invalid-feedback"> {{ errors[0] }} </span>
                            </div>
                            </validation-provider>

                            <div class="form-group mt-3">
                            <label class="mb-2" for="">付款方式</label>
                            <select class="form-control" name="payMethods" id="" v-model="payMethods">
                                <option value="" selected disabled>請選擇付款方式</option>
                                <option value="creditCard">線上刷卡</option>
                                <option value="cash">貨到付款</option>
                                <option value="ATM">ATM轉帳</option>
                            </select>
                            </div>

                            <validation-provider rules="required|min:16" v-slot="{ errors , classes }" v-if="payMethods === 'creditCard'">

                                <div class="form-row">
                                <div class="form-group mt-3 col-md-12">
                                <label class="mb-2" for="creditcard">信用卡卡號</label>
                                <input id="creditcard" type="tel" class="form-control" maxlength="16" v-model="creditCardCode" name="信用卡卡號" :class="classes">
                                <span class="invalid-feedback"> {{ errors[0] }} </span>
                                </div>
                                </div>

                            </validation-provider>

                            <validation-provider rules="required|min:3" v-slot="{ errors , classes }" v-if="payMethods === 'creditCard'">

                                <div class="form-row d-flex flex-row-reverse">
                                <div class="form-group mt-3 col-md-4">
                                <label class="mb-2" for="securityCode">安全碼</label>
                                <input id="securityCode" type="tel" maxlength="3" class="form-control" v-model="securityCode" name="安全碼" :class="classes">
                                <span class="invalid-feedback"> {{ errors[0] }} </span>
                                </div>

                                <div class="form-group mt-3 col-md-4">
                                <label class="mb-2">年</label>
                                <select class="form-control" v-model="expiryYear">
                                    <option value="2021" selected>2021年</option>
                                    <option :value="item" :key="item.id" v-for="item in 10"> {{ item + 2021 }}年</option>
                                </select>
                                </div>

                                <div class="form-group mt-3 col-md-4">
                                <label class="mb-2">月</label>
                                <select class="form-control" v-model="expiryMonth">
                                    <option :value="item" :key="item.id" v-for="item in 12"> {{ item }}月</option>
                                </select>
                                </div>
                                </div>

                            </validation-provider>

                            <validation-provider rules="required" v-slot="{ errors , classes }">
                            <div class="form-group mt-3">
                            <label class="mb-2" for="address">收件人地址</label>
                            <input id="address" type="address" name="收件人地址" v-model="checkoutData.user.address"
                                class="form-control" :class="classes">
                            <span class="invalid-feedback"> {{ errors[0] }} </span>
                            </div>
                            </validation-provider>

                            <div class="form-group">
                            <label class="mb-2" for="textArea">留言</label>
                            <br>
                            <div>
                                <textarea name="textArea" id="textArea" cols="30" rows="10" v-model="checkoutData.message"  style="width : 100%"></textarea>
                            </div>
                            </div>
                            <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary text-white mb-3" :disabled="invalid" :class="{'pageDisabled' : !payMethods}">下一步 : 確認訂單</button>
                            </div>

                            </form>

                        </validation-observer>

                    </div>

                    <div class="col-md-5">

                        <div class="card" style="width: 100%;">

                        <div class="card-header p-3">
                            <h5 class="card-title text-secondary h5 d-flex align-self-center mb-0">訂 單 說 明</h5>
                        </div>
                        <div class="card-body">

                            <div class="d-flex justify-content-between px-3 my-4">
                                <h3 class="card-subtitle text-muted">訂單數量</h3>
                                <p class="card-subtitle text-muted"> {{ cartsLen }} / 件</p>
                            </div>

                            <div class="d-flex justify-content-between px-3">
                                <h3 class="card-subtitle text-muted">總金額</h3>
                                <p class="card-subtitle text-muted"> <span class="text-primary h5 font-weight-bold"> {{ carts.final_total | dollarSign}} </span>元整</p>
                            </div>

                        </div>
                        <div class="card-footer bg-white">
                            <h2 class="text-primary h5">配送注意事項</h2>
                            <ul class="listFix">
                                <li class="my-3 text-secondary">依運送地區遠近不同，酌收運費</li>
                                <li class="my-3 text-secondary">特殊地形限制之偏遠山區鄉鎮無法送貨時，本公司保有出貨與否權利。</li>
                                <li class="my-3 text-secondary">須與貨運公司配送車次搭配安排。</li>
                                <li class="my-3 text-secondary">如無標註『免運』商品，均需酌收貨運費用。</li>
                                <li class="my-3 text-secondary">如有急件需求，請先與我們溝通貨品與運送時間，以免產生不必要的糾紛。</li>
                                <li class="my-3 text-secondary">若遇特殊情況不能配送(颱風、地震、水災等)，請體諒配送人員擇日再行運送。</li>
                            </ul>
                        </div>

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
      checkoutData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      carts: [],
      cartsLen: 1,
      payMethods: '',
      creditCardCode: '',
      securityCode: '',
      expiryMonth: 1,
      expiryYear: 2021,
      isCheckout: false
    }
  },
  methods: {
    getCart () {
      const self = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/cart`

      self.$http.get(api).then((res) => {
        if (res.data.success) {
          self.carts = res.data.data
          self.cartsLen = res.data.data.carts.length
        }
      })
    },
    checkOut () {
      const self = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMERPATH}/order`

      self.isCheckout = true
      self.$http.post(api, { data: self.checkoutData }).then((res) => {
        if (res.data.success) {
          setTimeout(() => {
            self.$bus.$emit('PayMethod', self.payMethods)
          }, 100)

          self.$bus.$emit('updateCart')
          self.$router.push(`checkOrder/${res.data.orderId}`)
        } else {
          alert('訂單發生錯誤')
        }
      })
    },
    toProductsPage (productsPage) {
      const self = this

      self.$bus.$emit('toWhere', (productsPage))
    }
  },
  created () {
    const self = this

    self.getCart()
    self.$bus.$on('updateCheckout', () => {
      self.getCart()
    })

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
</script>
