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
        <pagination></pagination>
        <!--  -->
    </div>
</template>

<script>

import pagination from '@/components/Pagination.vue'

export default {
  components: {
    pagination
  },
  data () {
    return {
      isLoading: false,
      orders: [],
      pagination: {}
    }
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/orders?page=${page}`

      vm.isLoading = true

      vm.$http.get(api).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.orders = res.data.orders
          vm.pagination = res.data.pagination
          vm.$bus.$emit('updatePagination', res.data.pagination)
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getOrders()
    vm.$bus.$on('toPage', (page) => {
      vm.getOrders(page)
    })
  }
}
</script>
