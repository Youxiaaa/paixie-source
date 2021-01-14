<template>
  <div>
    <div class="d-flex justify-content-center my-5" v-if="!pageHide">
    <ul class="pagination">
        <li><span><a href="#" @click.prevent="toPage(pages.current_page - 1)" :class="{'pageDisabled' : !pages.has_pre}">⬅</a></span></li>
        <li v-for="item in pages.total_pages" :key="item.id" :class="{'pageActive' : pages.current_page === item}"><a href="#" @click.prevent="toPage(item)" :class="{'text-white' : pages.current_page === item}"> {{ item }} </a></li>
        <li><span><a href="#" @click.prevent="toPage(pages.current_page + 1)" :class="{'pageDisabled' : !pages.has_next}">➡</a></span></li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pages: {},
      pageHide: false
    }
  },
  methods: {
    toPage (page) {
      const vm = this
      vm.$bus.$emit('toPage', page)
    }
  },
  created () {
    const vm = this
    vm.$bus.$on('updatePagination', (page) => {
      vm.pages = page
    })
    vm.$bus.$on('pageHide', (isOpen) => {
      vm.pageHide = isOpen
    })
  }
}
</script>
