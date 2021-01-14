<template>
    <div>

      <!-- loading效果 -->
      <loading :active.sync="isLoading"></loading>

      <!-- 過場動畫 -->
      <section>

        <div class="curtain"></div>

        <div class="rightCurtain1"></div>
        <div class="rightCurtain2"></div>

      </section>

      <section>
        <div class="signinArea">

          <div class="signinCard">

            <h2 class="text-center h2 mb-4 text-primary">登入</h2>

            <label for="signinAccount" class="h5 text-secondary">帳號</label>
            <br>
            <input type="text" id="signinAccount" v-model="user.username">
            <br>
            <label for="signinPw" class="h5 text-secondary">密碼</label>
            <input type="password" id="signinPw" v-model="user.password" @keyup.enter="signIn">
            <br>
            <a href="https://support.google.com/accounts/answer/41078?co=GENIE.Platform%3DDesktop&hl=zh-Hant" target="_blank">忘記密碼？</a>
            <br>
            <button type="button" class="tosignupBtn" @click.prevent="signupCardisShow = !signupCardisShow">註冊</button>
            <button type="button" class="signinBtn" @click.prevent="signIn" :class="{'pageDisabled' : user.username === '' || user.password === ''}">登入</button>

          </div>

            <div class="signupPos" :class="{'signupCardShow' : signupCardisShow}">

            <div class="signupCard">

              <div class="signupCardHole1"></div>
              <div class="signupCardHole2"></div>

              <h2 class="h2 text-primary mb-4 text-center">註冊</h2>

              <validation-observer v-slot="{ invalid }">

                <form @submit.prevent="sendSignup">

                  <validation-provider rules="required" v-slot="{ errors , classes }">
                  <label for="signupName" class="h5 text-secondary">會員名稱</label>
                  <br>
                  <input type="text" id="signupName" name="會員名稱" :class="classes" v-model="signupData.name">
                  <span class="invalid-feedback"> {{ errors[0] }} </span>
                  <br>
                  </validation-provider>

                  <validation-provider rules="required|min:10" v-slot="{ errors , classes }">
                  <label for="signupPw" class="h5 text-secondary">密碼</label>
                  <input type="password" id="signupPw" name="密碼" :class="classes" v-model="signupData.passowrd">
                  <span class="invalid-feedback"> {{ errors[0] }} </span>
                  <br>
                  </validation-provider>

                  <validation-provider rules="required|email" v-slot="{ errors , classes }">
                  <label for="signupEmail" class="h5 text-secondary">電子信箱</label>
                  <input type="email" id="signupEmail" name="電子信箱" :class="classes" v-model="signupData.email">
                  <span class="invalid-feedback"> {{ errors[0] }} </span>
                  <br>
                  </validation-provider>

                  <validation-provider rules="required" v-slot="{ errors , classes }">
                  <label for="signupAddress" class="h5 text-secondary">地址</label>
                  <input type="text" id="signupAddress" name="地址" :class="classes" v-model="signupData.address">
                  <span class="invalid-feedback"> {{ errors[0] }} </span>
                  <br>
                  </validation-provider>

                  <validation-provider rules="required|min:10" v-slot="{ errors , classes }">
                  <label for="signupTel" class="h5 text-secondary">手機號碼</label>
                  <input type="tel" id="signupTel" name="手機號碼" :class="classes" v-model="signupData.tel" maxlength="10">
                  <span class="invalid-feedback"> {{ errors[0] }} </span>
                  <br>
                  </validation-provider>

                  <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="checkBtn" name="會員守則" v-model="signupData.checkRule">
                  <label class="form-check-label" for="checkBtn">
                      我願意遵守
                      <a href="#" data-toggle="modal" data-target="#ruleModal">會員守則</a>
                  </label>
                  </div>

                  <div class="d-flex justify-content-between mt-4">
                      <a href="#" class="tologinBtn align-self-center" @click.prevent="signupCardisShow = !signupCardisShow">已有帳號？</a>
                      <button type="submit" class="btn btn-primary text-white" :disabled="invalid" :class="{'pageDisabled' : !signupData.checkRule}">註冊</button>
                  </div>

                </form>

              </validation-observer>

            </div>

            </div>

        </div>
      </section>

      <!-- rule modal -->
      <div class="modal fade ruleModal" id="ruleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white h5" id="exampleModalLabel">會員守則</h5>
        </div>
        <div class="modal-body">
          <h2 class="h3 my-1 text-primary">會員條款</h2>
          <br>

          <p class="lh-global text-secondary">
            本電商網站是由『YoYo游』提供的一套電商網站系統。本服務條款(下稱 「本協議」)適用於所有使用本網站的訪客、註冊會員、(下稱」用戶」)。請用戶必須細心閱讀並接受本協議的所有政策及守則。 如用戶一旦訪問或使用本網站的服務，即視作同意及遵守本協議內的所有內容。
          </p>

          <br>

          <h2 class="h3 my-1 text-primary">條款和服務適用範圍</h2>

          <br>

          <p class="lh-global text-secondary">
              本協議內的用戶是指凡瀏覽或使用本網站的任何人仕，無論該人仕是否已註冊成為註冊用戶。用戶包括使用本網站的任何人仕以及由該人仕授權代表下的法人實體。
              <br>
              <br>
              用戶成功註冊後，即表示用戶已同意授權本網站與inMall按照私隱政策(下稱」私隱政策」)來使用共享聯繫信息，如用戶名稱、聯絡電話和電子郵件地址等。
              <br>
              <br>
              用户瀏覽或使用本網站時，即表示用户已清楚並同意接受本協議中的所有條款。用户應受本協議的條款約束，包括用户瀏覽或使用本網站以及日後本網站內的系統更新、升級維護、修訂、刪除、添加或更改。用户理解並同意，在本協議更新之後倘用戶繼續瀏覽或使用本網站將被視為接受更新後的協議。
              <br>
              <br>
              用户同意遵守香港法律有關瀏覽或進行網上活動時的行為。此外，用户必須遵守本網站服務條款中的所有條款、營運規則、政策和程序。本協議受香港特別行政區法律的管轄。
              <br>
              <br>
              本網站上所顯示的部份內容或由第三方提供或發佈的(下稱」第三方內容」)，任何第三方內容均由提供內容的一方負責及承擔責任。 本網站不會對任何第三方內容的準確性、適當性、合法性或真實性負責，並且不會對任何用戶對此類第三方內容的接收理解負責。此外，本網站不會對任何用戶的活動負責，也不會對任何用戶因此類行為而遭受的任何損失負責。
              <br>
              <br>
              本網站允許用戶通過連結(以廣吿，頻道或其他形式)瀏覽第三方網站提供的內容、產品或服務。但本網站提醒用戶在瀏覽或使用此類網站之前，請務必細心閱讀此類網站的服務條款和隱私政策，再決定是否繼續瀏覽或使用此類網站。用戶清楚明白本網站無法控制或監控此類第三方網站所提供的任何內容、產品或服務，所以用戶一旦瀏覽或使得第三方網站，用戶需對自己的行為及後果負上全部責任，本網站不會亦無須對任何用戶因此類行為及後果而遭受的任何損失負責。
              <br>
              <br>
              用戶需確認、保證並同意所有提交、發佈和顯示給本網站上的所有用戶名、文字、信息、圖形、圖像、照片、音頻、視頻、目錄、文件、連結、數據庫或列表(下稱」信息」)等資料均為正確途徑取得。
              <br>
              <br>
              本網站提供中國內地各地區的配送服務，詳情可參考本網站上的<span class="text-danger">配送條款</span>。
              <br>
              <br>
              本網站不設中國香港和其他地區的配送服務，用户可選擇到本網站旗下的實體店提取貨件。
              <br>
              <br>
              本網站有權拒絕向任何用戶提供服務。
              <br>
              <br>
              本網站有權將用戶於本網站上發佈的任何不適合信息刪除。
              <br>
              <br>
              本網站不建議每名用戶擁有多個帳戶。 本網站有權在認為有必要保護用戶免受欺詐或欺詐風險時將每名用戶的賬戶限制為一個帳戶。
              <br><br>
          </p>

          <h2 class="text-primary h3 my-1">用户守則</h2>

          <br>

          <p class="lh-global text-secondary">
              註冊用戶需確保其註冊時的所提交的全部資料均為真實、準確、完整和最新。
              <br>
              <br>
              用戶通過提供其資料(例如姓名，聯絡電話，電子郵件地址等)在本網站上成功登記成為註冊用戶後，每名成功註冊的用戶都會建立一個個人帳戶(下稱」帳戶」)，註冊用戶將獲提供個人登入名稱(下稱」登入名稱」)和密碼(下稱」密碼」)用作登錄及日後管理其帳戶之用。
              <br>
              <br>
              用戶瀏覽或使用本網站時，不得複製或下載本網站所提供的信息用作銷售或重新發放郵件(通過電子郵件，無線短信，實體郵件或其他方式)並經營與本網站有競爭性的業務。任何人仕未經本網站書面授權同意，禁止以直接或間接的方式從本網站搜集及彙編數據庫或目錄。
              <br>
              <br>
              用戶需確保其密碼安全，用户同意並接受在沒有得到本網站書面同意下的，不得將其用戶名稱和及密碼提供給本網站以外的任何他方。用戶需對其未能保持密碼安全而導致的所有後果負擔全部責任。如用户發現任何人未經授權使用其密碼或違反安全規定的行為時，應立即通知本網站，用户同意本網站不會亦無須對用户未能保護其密碼安全所造成的損失承擔任何責任。
              <br>
              <br>
              用户要在本網站上收取資訊，必須時刻保持其帳戶資料的最新和準確， 例如有效的電話號碼和電子郵件地址等資料。
              <br>
              <br>
              用户在使用或瀏覽本網站時，需確保其所提供的資料一切屬實、準確、最新和完整。用戶並授權本網站可根據本協議中的規定擁有永久及不可撤銷的版權。
              <br>
              <br>
              用戶需確認，保證並同意所有提交、發佈和顯示給本網站上的所有用戶名、文字、信息、圖形、圖像、照片、音頻、視頻、目錄、文件、連結、數據庫或列表(下稱」信息」)等資料不得含有以下：
              <br>
              <br>
              違反任何法律、法規、條例、第三方權利及本協議(包括但不限於出口管制，消費者條例，反競爭，反歧視或商品說明)的信息 ;
              <br>
              <br>
              發佈含有欺詐、欺騙、誤導、虛假、誹謗、不當及非法內容的信息或垃圾郵件， 並涉及銷售或企圖銷售假冒或盜版物品 ;
              <br>
              <br>
              通過本網站分發或轉發任何可能損害本網站的病毒或其他技術 ;
              <br>
              <br>
              發佈任何含有淫穢、色情、粗鄙、騷擾、威脅、恐嚇、虐待、侵權或對兒童不宜的信息、商品或服務 ;
              <br>
              <br>
              發佈任何有關種族、性別、宗教、國籍、殘疾，性取向或年齡歧視的信息、商品或服務 ;
              <br>
              <br>
              發佈任何未經授權的廣告或鏈連結(包括但不限於垃圾郵件)的信息，侵犯其他人仕的私隱行為，違反任何法律或法規 ;
              <br>
              <br>
              限製、騷擾、破壞或禁止任何其他用戶瀏覽或使用本網站服務 ;
              <br>
              <br>
              未經同意及授權，私自複製、修改、發佈本網站的內容，包括版權和商標等資料 ;
              <br>
              <br>
              違反任何特定通信服務的行為及準則;
              <br>
              <br>
              未經同意及授權，私自收集或以其他方式收集有關本網站用戶的任何信息或數據。
              <br>
              <br>
              用戶必須遵守與本協議相關之任何條款或政策，不得不當地使用或干擾本網站。用戶只可在法律允許的範圍下使用本網站。除非另有條文規定，否則不得因任何商業目的而取覽或使用本網站或其任何部分。
              <br>
              <br>
              本網站所提供之第三方網站或資源之連結(廣告客戶)是希望這些連結能為用戶帶來方便及資訊，並不代表本網站認可該第三方內容。本網站對第三方網站內容和資訊的準確性概不負責。用戶需自行負上進入第三方網站的責任。除非用戶得到本網站書面的同意，否則用戶不可張貼任何網絡連結到本網站，本網站保留任何追究責任之權利。
              <br>
              <br>
              為儘力維護用户在本網站上的運作安全及順暢，本網站會採取最低限度的行動來驗證信息的準確性。但是，由於互聯網上的信息驗證很困難，因此本網站不能也不會確保證每個信息的準確性。本網站鼓勵用户使用互聯網上提供的各種工具以及常識來評估交易。
          </p>

          <p class="text-primary h3 my-3">
            商標和版權
          </p>
          <p class="lh-global text-secondary">
            本網站內的所有事物，都是屬於本網站的，或經版權和/或商標擁有者的明確許可下使用的。用戶在沒有得到本網站的書面許可下，嚴禁任何複製、傳送、轉發、發佈、連結，或以其他方式修改本網站。任何違反此政策可能導致侵犯版權、商標或其他知識產權的行為，最終責任由用戶承擔。
            <br>
            <br>
            本網站及相關商標、文字、信息、圖像、視頻、目錄、文件、數據庫是受適用的版權商標和其他有關法律保護的。未經本網站授權許可，不可複製，修改，使用或發佈本網站的商標、文字、信息、圖像、視頻、目錄、文件、數據庫。
            <br>
            <br>
          </p>

          <h2 class="text-primary h3 my-1">服務之修改</h2>

          <br>

          <p class="lh-global text-secondary">
            本網站可以隨時修訂本協議。一經修改和重述的協議會將在本網站上發佈後即時生效。任何人仕除非以書面形式提出意見並獲本網站授權人仕的書面同意，否則不得以任何形式來修改本協議。
            <br>
            <br>
            用戶必須細心閱讀並接受這些條款以及本網站的私隱政策中的所有條款，如用戶一旦瀏覽或使用本網站即被視作同意及遵守本協議內的所有內容。本協議亦可能會不時更新，恕不另行通知。 因此，本網站建議用戶需要定期瀏覽本網站以了解最新的消息。
            <br>
            <br>
          </p>

          <h2 class="text-primary h3 my-1">終止服務</h2>

          <br>

          <p class="lh-global text-secondary">
            本網站有權在未事先通知用戶前，暫停或終止註冊用戶的賬戶。但是，如本網站發現註冊用戶違反了本協議的任何規定，或有合理理由懷疑註冊用戶提供的此類信息不真實，不准確或不是最新或完整; 或認為註冊用戶的行為可能導致財務損失或法律責任，則不需要任何通知即可終止其賬戶。本網站對本服務的暫停或終止對用戶所造成的損害或利益損失不負任何責任。
          </p>

          <br>

          <h2 class="text-primary h3 my-1">免責聲明</h2>

          <br>

          <p class="lh-global text-secondary">
            本網站保留自行決定刪除其認為第三方非法的應用程序/網站上顯示的任何信息的權利，本網站保留配合與政府當局，警方，執法機構等合作調查任何涉嫌犯罪行為的權利。此外，如果政府當局，警方，或執法機構等提出要求，傳票或其他法律訴訟，本網站可能會根據法例披露用戶的身份和聯繫信息，本網站不會對其結果負責。用戶亦同意不可以對本網站提出任何訴訟或賠償的要求。對於上述任何一項，本網站可以自行決定暫停或終止任何用戶的賬戶。
            <br>
            <br>
            用戶需對其於本網站上的交易承擔全部責任，包括但不限於購買、銷售、付款、運輸、退貨、倉存、保養及維修、保險、稅收、許可證或罰款等。
            <br>
            <br>
            本網站不會對用戶進行交易時、疏忽、違反訂購條款或其他任何原因，包括但不限於財務損失或信息遺失所造成的直接或間接損失或損害承擔任何責任。
            <br>
            <br>
            在任何情況下，本網站均不會對因超出合理控制範圍所提供的信息或服務的延遲、中斷或失敗而直接或間接因超出合理控制的原因，包括但不限於互聯網故障，瀏覽工具，電信或任何其他設備故障、電力故障、罷工、勞資糾紛、騷亂、叛亂、內亂、勞工或材料短缺、火災、洪水、風暴、爆炸、戰爭、政府政策行為，法院或法庭的決策負上任何責任。
            <br>
            <br>
            通過本網站下載或以其他方式獲得的任何材料均由用戶自行決定並承擔風險，並且每個用戶對其瀏覽工具的任何損壞或下載任何此類材料可能導致的數據丟失承擔全部責任。任何用戶從本網站獲得的任何口頭或書面建議或信息均不構成本文未明確說明的任何保證。
            <br>
            <br>
            本網站內的所有產品相片、描述只供參考之用，實際以收到産品為準。
            <br>
            <br>
          </p>

          <h2 class="text-primary h3 my-1">其他</h2>

          <br>

          <p class="lh-global text-secondary">
            本協議的標題僅供參考，絕不限定、解釋或描述該部分的範圍。
            <br>
            <br>
            本協議中的任何條款被認定無效或不可執行，本協議的所有其餘條款仍然完全有效。
            <br>
            <br>
            如有任何爭議，本網站將保留最終決定權。
            <br>
            <br>
            如有任何查詢， 歡迎電郵給我們以便從速跟進。
            <br>
            <br>
            ＜本條款及細則的中文與英文版本如有任何歧異，概以中文版本為準。＞
            <br>
            <br>
          </p>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary text-white" data-dismiss="modal">確定</button>
        </div>
        </div>
      </div>
      </div>

    </div>
</template>

<script>

import $ from 'jquery'

export default {
  data () {
    return {
      signupCardisShow: false,
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
      signupData: {
        name: '',
        password: '',
        email: '',
        address: '',
        tel: '',
        checkRule: false
      }
    }
  },
  methods: {
    openPage () {
      setTimeout(() => {
        $('.curtain').addClass('curtainShow')
      }, 5)
    },
    signIn () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`

      vm.isLoading = true
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `youxiaaaToken=${token}; expires=${new Date(expired)};`
          vm.$router.push('/admin/products')
        } else {
          vm.isLoading = false
          vm.$noty.error(res.data.message)
        }
      })
    },
    sendSignup () {
      const vm = this
      vm.$noty.success(`我們已將確認信寄送至您填寫的“${vm.signupData.email}”信箱囉 請再點擊確認郵件後以完成註冊`)
    }
  },
  created () {
    const vm = this
    vm.openPage()
    vm.$bus.$emit('getPathName')
  }
}
</script>
