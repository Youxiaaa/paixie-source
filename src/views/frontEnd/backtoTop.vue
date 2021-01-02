<template>
    <div>

        <a href="#" @click.prevent="backTop" class="backTopIcon" :class="{'showScroolTop' : showScrollTop}">
            <img src="@/assets/img/scrollTop.png" alt="backToTop-Icon" width="60px" height="60px">
        </a>

    </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      showScrollTop: false
    }
  },
  methods: {
    backTop () {
      $('html,body').animate({ scrollTop: 0 }, '500')
    },
    getScrollPos () {
      const self = this
      const scrollPos = $(window).scrollTop()
      if (scrollPos > 300) {
        self.showScrollTop = true
      } else {
        self.showScrollTop = false
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.getScrollPos)
  }
}
</script>
