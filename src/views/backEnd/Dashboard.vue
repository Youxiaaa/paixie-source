<template>
    <div>

      <navBar></navBar>

      <router-view></router-view>

    </div>
</template>

<script>
import navBar from './NavBar'
export default {
  components: {
    navBar
  },
  created () {
    const vm = this
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)youxiaaaToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    vm.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
