<template>
    <div>

        <navBar></navBar>

        <router-view></router-view>

    </div>
</template>

<script>

import $ from 'jquery'

import navBar from './navBar'

export default {
  methods: {

  },
  components: {
    navBar
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)youxiaaaToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>
