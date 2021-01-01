<template>
    <div>
        <navBar></navBar>
        <cart></cart>
        <router-view></router-view>
        <footerBar></footerBar>
        <backTop></backTop>
    </div>
</template>

<script>

import $ from 'jquery'
import navBar from './navBar'
import footerBar from './footer'
import cart from './cart'
import backTop from './backtoTop'

export default {
  components: {
    navBar,
    footerBar,
    cart,
    backTop
  }
}
</script>
