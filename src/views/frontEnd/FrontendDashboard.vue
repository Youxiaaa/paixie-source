<template>
    <div>
      <div class="content-area">
          <navBar></navBar>
          <cart></cart>
          <router-view></router-view>
          <backTop></backTop>
      </div>
          <footerBar></footerBar>
    </div>
</template>

<script>

import navBar from './NavBar'
import footerBar from './Footer'
import cart from './Cart'
import backTop from './BacktoTop'

export default {
  components: {
    navBar,
    footerBar,
    cart,
    backTop
  }
}
</script>
