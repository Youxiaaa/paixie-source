<template>
    <div>

        <!-- loading效果 -->
      <loading :active.sync="isLoading"></loading>

      <!-- 商品列表 -->
      <div class="container-fluid mt-5 pt-5">

        <div class="d-flex justify-content-end mb-3">

        <button class="btn btn-info text-white px-4" @click.prevent="openProductModal(true)">新增商品</button>

        </div>

        <div class="table-responsive">
        <table class="table table-hover tableResponsiveFix">
          <thead>
            <tr>
              <th width="15%" class="tableSmRemove"></th>
              <th>商品名稱</th>
              <th width="10%">原價</th>
              <th width="10%">售價</th>
              <th width="15%" class="text-center">是否啟用</th>
              <th width="15%" class="text-center">編輯</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td class="tableSmRemove"><img :src="item.imageUrl" alt="" width="100px" height="100px"></td>
              <td> {{ item.title }} </td>
              <td class="text-right"> {{ item.origin_price | dollarSign }} </td>
              <td class="text-right text-primary font-weight-bold"> {{ item.price | dollarSign }} </td>
              <td class="text-center">
                <span v-if="item.is_enabled" class="text-success">是</span>
                <span v-if="!item.is_enabled" class="text-danger">否</span>
              </td>
              <td class="text-center">
                <button class="btn btn-info text-white" @click.prevent="openProductModal(false , item)">
                    編輯
                </button>
                <button class="btn btn-outline-danger" @click.prevent="openDelproductModal(item)">
                    刪除
                </button>
              </td>
            </tr>
          </tbody>

        </table>
        </div>

      </div>

      <!-- 後台商品共用modal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title h4" id="exampleModalLabel">
            <span>新增產品</span>
            </h5>
          </div>
          <div class="modal-body">
            <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
              <label for="image" class="mb-2">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
              <div class="form-group">
              <label for="customFile" class="mb-2">或 上傳圖片
              </label>
              <i class="fas fa-spinner fa-pulse" v-if="fileUploadedStatus"></i>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
              </div>
              <img :src="tempProduct.imageUrl"
              class="img-fluid" alt="">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"
                placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
              </div>

              <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
              </div>
              <hr>

              <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                id="is_enabled" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                <label class="form-check-label" for="is_enabled">
                是否啟用
                </label>
              </div>
              </div>
            </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary text-white" @click.prevent="updateProduct">
                <i class="fas fa-spinner fa-pulse" v-if="updateProductLoadingIcon"></i>
                確認
            </button>
          </div>
          </div>
        </div>
      </div>

      <!-- 刪除用modal -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
          aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
            @click.prevent="delProduct(tempProduct.id)"
            >確認刪除</button>
            </div>
            </div>
        </div>
      </div>

      <!-- 分頁 -->
      <pagination></pagination>

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
      isNew: false,
      products: [],
      tempProduct: {},
      fileUploadedStatus: false,
      updateProductLoadingIcon: false,
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/products?page=${page}`
      const vm = this

      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.products = res.data.products
          $('.curtain').addClass('curtainShow')
          vm.$bus.$emit('updatePagination', res.data.pagination)
        } else {
          alert('商品資料讀取失敗')
        }
      })
    },
    openProductModal (isNew, item) {
      const vm = this

      if (isNew) {
        vm.tempProduct = {}
        vm.isNew = true
      } else {
        vm.tempProduct = { ...item }
        vm.isNew = false
      }
      $('#productModal').modal('show')
    },
    openDelproductModal (item) {
      const vm = this

      vm.tempProduct = item
      $('#delProductModal').modal('show')
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/product`
      let httpMethod = 'post'

      vm.isLoading = true
      vm.updateProductLoadingIcon = true

      if (vm.isNew === false) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.updateProductLoadingIcon = false
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          vm.updateProductLoadingIcon = false
          $('#productModal').modal('hide')
          alert('商品更新失敗')
        }
      })
    },
    delProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/product/${id}`

      vm.isLoading = true

      vm.$http.delete(api).then((res) => {
        vm.isLoading = false

        if (res.data.success) {
          vm.getProducts()
          $('#delProductModal').modal('hide')
        } else {
          $('#delProductModal').modal('hide')
        }
      })
    },
    uploadFile () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/admin/upload`
      const uploadedFile = vm.$refs.files.files[0]
      const formData = new FormData()

      vm.fileUploadedStatus = true
      vm.tempProduct.imageUrl = ''

      formData.append('file-to-upload', uploadedFile)

      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.success) {
          vm.fileUploadedStatus = false
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
        } else {
          vm.fileUploadedStatus = false
          alert(res.data.message.message)
        }
      })
    }
  },
  created () {
    const vm = this
    vm.getProducts()
    vm.$bus.$on('toPage', (page) => {
      vm.getProducts(page)
    })
  }
}
</script>
