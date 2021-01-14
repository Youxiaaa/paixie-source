<template>
    <div>

      <!-- 過場動畫 -->
      <section>

      <div class="curtain" :class="{'curtainShow' : curtainOpen}"></div>

      <div class="rightCurtain1" :class="{'curtainShow' : rightCurtainisOpen}"></div>
      <div class="rightCurtain2" :class="{'curtain2Show' : rightCurtainisOpen}"></div>

      </section>

      <div class="d-flex justify-content-center mt-3 mb-2 pt-5" v-if="!order.is_paid">
        <h2 class="text-primary checkOutTitle mt-5 mb-5">S T E P 2 . 確 認 訂 單</h2>
      </div>

      <div class="d-flex justify-content-center mt-3 mb-2 pt-5" v-if="order.is_paid">
        <h2 class="text-primary checkOutTitle mt-5 mb-5">S T E P 3 . 完 成 訂 單</h2>
      </div>

      <!-- 訂單細節確認 -->
      <section>
        <div class="container">

        <table class="table text-secondary mb-5" v-if="!order.is_paid">
          <thead>
            <tr class="bg-primary text-white border-0">
              <th></th>
              <th>商品名稱</th>
              <th>數量</th>
              <th>金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td>
                <img :src="item.product.imageUrl" alt="商品圖片" width="25px" height="25px">
              </td>
              <td>
                {{ item.product.title }}
              </td>
              <td width="20%">
                {{ item.qty }} / {{ item.product.unit }}
              </td>
              <td class="text-right" width="30%">
                {{ item.total | dollarSign }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總金額</td>
              <td class="text-right text-primary h4">
                NT{{ order.total | dollarSign }}
              </td>
            </tr>
          </tfoot>
        </table>

        <table class="table text-secondary">
          <thead class="bg-primary">
            <tr>
              <th colspan="2" class="text-white border-0">確 認 訂 單</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>訂單編號</td>
              <td> {{ order.id }} </td>
            </tr>
            <tr>
              <td>付款方式</td>
              <td v-if="payMethod === 'creditCard'"> 線上刷卡 </td>
              <td v-if="payMethod === 'cash'"> 貨到付款 </td>
              <td v-if="payMethod === 'ATM'"> ATM轉帳 </td>
            </tr>
            <tr v-if="payMethod === 'ATM'">
              <td>收款銀行</td>
              <td> 喵喵銀行(877) <br> 帳號 : 1234-123-123456 </td>
            </tr>
            <tr>
              <td>總金額</td>
              <td class="text-primary"> {{ total | dollarSign }} </td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td class="text-success" v-if="order.is_paid"> 已完成付款 </td>
              <td class="text-danger" v-if="!order.is_paid"> 未付款 </td>
            </tr>
            <tr>
              <td>收件人姓名</td>
              <td> {{ order.user.name }} </td>
            </tr>
            <tr>
              <td>電子信箱</td>
              <td> {{ order.user.email }} </td>
            </tr>
            <tr>
              <td>聯絡電話</td>
              <td> {{ order.user.tel }} </td>
            </tr>
            <tr>
              <td>收件地址</td>
              <td> {{ order.user.address }} </td>
            </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-end mb-5" v-if="!order.is_paid">
          <button class="btn btn-primary text-white btn-lg" @click.prevent="payOrder">付款去</button>
        </div>

        <div class="d-flex justify-content-center my-5" v-if="order.is_paid">
          <button class="btn btn-primary text-white btn-lg w-50" @click.prevent="toWhere('products')">繼 續 逛 逛</button>
        </div>

        </div>
      </section>

    </div>
</template>

<script>
export default {
  data () {
    return {
      payMethod: '',
      orderId: '',
      curtainOpen: false,
      rightCurtainisOpen: false,
      order: {
        user: {}
      },
      cartsLen: 1,
      total: 1
    }
  },
  methods: {
    getPayMethod (pay) {
      const vm = this
      vm.payMethod = pay
    },
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/order/${vm.orderId}`

      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.curtainOpen = true
          vm.order = res.data.order
          vm.total = res.data.order.total
          vm.orderId = res.data.order.id
        }
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/pay/${vm.orderId}`

      vm.rightCurtainisOpen = true

      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.getOrder()

          setTimeout(() => {
            vm.$bus.$emit('getPathName')
            vm.rightCurtainisOpen = false
          }, 1000)
        }
      })
    },
    toWhere (products) {
      const vm = this

      vm.$bus.$emit('toWhere', (products))
    }
  },
  created () {
    const vm = this

    vm.orderId = vm.$route.params.orderId
    vm.$bus.$on('PayMethod', (pay, orderId, cartsLen) => {
      vm.getPayMethod(pay)
    })
    vm.getOrder()
    vm.$bus.$emit('getPathName')

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}
</script>
