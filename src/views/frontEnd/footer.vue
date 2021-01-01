<template>
    <div>

        <footer>
            <div class="row footer">

                <div class="col-md-4 text-center">
                <h2>
                    <a href="#">
                        <img src="static/img/footer-logo.svg" alt="footer logo" title="拍謝">
                    </a>
                </h2>
                    <p class="text-white my-2 h6"><i class="fas fa-phone-alt"></i> (02)1234-5678</p>
                    <p class="text-white my-2 h6"><i class="fas fa-map-marker-alt"></i> 台北市中山區行天宮附近</p>
                </div>

                <div class="col-md-4 text-center d-flex justify-content-center align-items-center text-white h6">
                    <h2>
                        Copyright &copy; 2020 YoYo游
                    </h2>
                </div>

                <div class="col-md-4 d-flex justify-content-center align-items-center">
                    <a href="https://www.facebook.com/YuTsungChih" target="_blank" class="text-white socialIcon" title="link to facebook">
                        <i class="fab fa-facebook-square fa-2x"></i>
                    </a>

                    <a href="https://www.instagram.com/youxiaaaaaa/" target="_blank" class="text-white socialIcon" title="link to instagram">
                        <i class="fab fa-instagram fa-2x"></i>
                    </a>

                    <a href="https://github.com/Youxiaaa" target="_blank" class="text-white socialIcon" title="link to twitter">
                        <i class="fab fa-github-square fa-2x"></i>
                    </a>
                </div>
            </div>
        </footer>

    </div>
</template>

<script>
export default {
  methods: {
    toWhere (pageName) {
      const self = this

      const htmlHref = window.location.href.replace(/^http:\/\/[^/]+/, '')
      const addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1)
      const index = addr.lastIndexOf('\/')
      const addrLast = decodeURI(addr.substring(index + 1, addr.length))

      if (addrLast == pageName) { return };

      self.hamburgerChange = false

      $('.hamburgerMenu').removeClass('hamburgerMenuShow')
      $('.rightCurtain1').addClass('curtainShow')
      $('.rightCurtain2').addClass('curtain2Show')

      setTimeout(() => {
        self.$router.push(pageName)
      }, 1200)
    },
    menuActive (pathName) {
      const self = this

      switch (pathName) {
        case 'about' :
          self.aboutisActive = true
          self.productsisActive = false
          self.signinisActive = false
          break
        case 'products' :
          self.aboutisActive = false
          self.productsisActive = true
          self.signinisActive = false
          break
        case 'signin' :
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = true
          break
        default :
          self.aboutisActive = false
          self.productsisActive = false
          self.signinisActive = false
          break
      }
    }
  }
}
</script>
