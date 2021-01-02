<template>
    <div>

        <!-- loading效果 -->
        <loading :active.sync="isLoading"></loading>
        <!--  -->

        <!-- 訂單 -->
        <section>

            <div class="table-responsive mt-5 pt-5">
            <table class="table table-hover tableResponsiveFix">
                <thead>
                    <tr>
                        <th>訂單編號</th>
                        <th>產品名稱</th>
                        <th>訂購日期</th>
                        <th>付款狀態</th>
                        <th>總金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in orders" :key="item.id">
                        <td class="text-secondary"> {{ item.id }} </td>
                        <td class="text-secondary">
                            <ul>
                                <li v-for="order in item.products" :key="order.id">
                                    {{ order.product.title }}
                                </li>
                            </ul>
                        </td>
                        <td class="text-secondary"> {{ item.paid_date | filterDate }} </td>
                        <td>
                            <span v-if="item.is_paid" class="text-success">已付款</span>
                            <span v-if="!item.is_paid" class="text-danger">未付款</span>
                        </td>
                        <td class="text-right text-danger"> {{ item.total | dollarSign }} </td>
                    </tr>
                </tbody>
            </table>
            </div>

        </section>
        <!--  -->

        <!-- 分頁 -->
        <section>

            <div class="d-flex justify-content-center mb-5">
                <ul class="pagination">
                    <li><span><a href="#" :class="{'pageDisabled' : !pagination.has_pre}" @click.prevent="getOrders(pagination.current_page - 1)">⬅</a></span></li>
                    <li v-for="item in pagination.total_pages" :key="item.id" :class="{'pageActive' : pagination.current_page === item}"><a href="#" :class="{'text-white' : pagination.current_page === item}" @click.prevent="getOrders(item)"> {{ item }} </a></li>
                    <li><span><a href="#" :class="{'pageDisabled' : !pagination.has_next}" @click.prevent="getOrders(pagination.current_page + 1)">➡</a></span></li>
                </ul>
            </div>

        </section>

        <!--  -->
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const self = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/orders?page=${page}`

      self.isLoading = true

      self.$http.get(api).then((res) => {
        self.isLoading = false

        if (res.data.success) {
          self.orders = res.data.orders
          self.pagination = res.data.pagination
        }
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
