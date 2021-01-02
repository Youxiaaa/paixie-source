<template>
    <div>

        <navBar></navBar>

        <router-view></router-view>

    </div>
</template>

<script>
import navBar from './navBar'
export default {
  components: {
    navBar
  },
  created () {
    const self = this
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)youxiaaaToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    self.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
