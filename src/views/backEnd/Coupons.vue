<template>
    <div>
      <!-- loading效果 -->
      <loading :active.sync="isLoading"></loading>

      <!-- 折價券清單 -->
      <div class="container-fluid mt-5 pt-5">

      <div class="d-flex justify-content-end mb-3">

        <button class="btn btn-info text-white px-4" @click.prevent="openCouponModal(true)">新增折價券</button>

      </div>

      <div class="table-responsive">

      <table class="table table-hover tableResponsiveFix">

        <thead>
          <tr>
            <th>折價券名稱</th>
            <th width="150px">折扣代碼</th>
            <th width="120px">折扣百分比</th>
            <th width="200px">到期日</th>
            <th width="100px">是否啟用</th>
            <th width="120px" class="text-center">編輯</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td class="text-secondary"> {{ item.title }} </td>
            <td class="text-success"> {{ item.code }} </td>
            <td class="text-center text-danger"> {{ item.percent }}% </td>
            <td class="text-secondary"> {{ item.due_date | filterDate }} </td>
            <td>
              <span class="text-success" v-if="item.is_enabled">已啟用</span>
              <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
            </td>
            <td class="text-center">
              <button class="btn btn-info btn-sm text-white" @click.prevent="openCouponModal(false , item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelCouponModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>

      </table>

      </div>

      </div>

      <!-- 分頁 -->
      <pagination></pagination>

      <!-- 折價券modal -->
      <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
        <div class="modal-header bg-primary text-white h5">
          <h5 class="modal-title" id="exampleModalLabel">更新優惠券</h5>
        </div>
        <div class="modal-body">
          <label class="text-secondary" for="couponName">優惠券名稱</label>
          <br>
          <input type="text" id="couponName" v-model="tempCoupon.title">
          <br>
          <label class="text-secondary" for="couponCode">折扣碼</label>
          <br>
          <input type="text" id="couponCode" v-model="tempCoupon.code">
          <br>
          <label class="text-secondary" for="couponPercent">折扣百分比</label>
          <br>
          <input type="number" id="couponPercent" v-model="tempCoupon.percent">
          <br>
          <label class="text-secondary" for="couponDuedate">到期日</label>
          <br>
          <input type="date" id="couponDuedate" v-model="tempCoupon.due_date">
          <br>
          <div class="form-check">
          <input class="form-check-input" type="checkbox" id="couponIsenabled" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
          <label class="form-check-label text-secondary" for="couponIsenabled">
              是否啟用
          </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary text-white" @click.prevent="updateCoupon">更新</button>
        </div>
        </div>
      </div>
      </div>

      <!-- 刪除折價券modal -->
      <div class="modal fade" id="delCouponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header bg-danger text-white h5">
          <h5 class="modal-title" id="exampleModalLabel">刪除折價券</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          確定要刪除 <span class="text-danger h5">{{ tempCoupon.title }}</span> 嗎？ 刪除後將無法恢復！！！
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-outline-primary" @click.prevent="delCoupon">刪除</button>
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
      isLoading: false,
      tempCoupon: {},
      coupons: [],
      pagination: {},
      isNew: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/coupons?page=${page}`

      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.coupons = res.data.coupons
          vm.pagination = res.data.pagination
          vm.$bus.$emit('updatePagination', res.data.pagination)
        }
      })
    },
    openCouponModal (isNew, item) {
      const vm = this

      if (isNew) {
        vm.isNew = true
        vm.tempCoupon = {}
      } else {
        vm.isNew = false
        vm.tempCoupon = { ...item }
      }

      $('#couponModal').modal('show')
    },
    openDelCouponModal (item) {
      const vm = this

      vm.tempCoupon = item

      $('#delCouponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/coupon`
      let httpMethod = 'post'
      const timestamp = Math.floor(new Date(vm.tempCoupon.due_date) / 1000)

      vm.tempCoupon.due_date = timestamp
      vm.isLoading = true

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }

      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.getCoupons()
          $('#couponModal').modal('hide')
        } else {
          alert('新增優惠券失敗')
        }
      })
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/coupon/${vm.tempCoupon.id}`

      vm.isLoading = true
      vm.$http.delete(api).then((res) => {
        vm.isLoading = false
        $('#delCouponModal').modal('hide')

        if (res.data.success) {
          vm.getCoupons()
        } else {
          alert('折價券刪除失敗')
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getCoupons()
    vm.$bus.$on('toPage', (page) => {
      vm.getCoupons(page)
    })
  }
}
</script>
