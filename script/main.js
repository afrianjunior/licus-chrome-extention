const firstTime = (c, self) => {
  const lg = self.config.language
  if (self.page === 'welcome') {
    return c("div", { attrs: { class: "first-page" } }, [
      c("div", { attrs: { class: "heading"} }, self.text.firstOpening),
      c("input", { 
        domProps: {
          value: self.data.settings.name
        },
        on: {
          input(e) {
            const value  = e.target.value
            self.data.settings.name = value
          },
          keyup(e) {
            if (e.shiftKey || e.keyCode === 13) {
              const val = self.data.settings.name
              if (val) {
                if (self.textValidation(val)) {
                  self.page = "setPass"
                }
              }
            }
          }
        },
        attrs: {
          class: 'text-center',
          type: "text",
          placeholder: self.text.phFirstOpening
        }
       }, self.home.name )
    ])
  } else if (self.page === 'setPass') {
    return c("div", { attrs: { class: "first-page" } }, [
      c("div", { attrs: { class: "heading"} }, self.text.setPassOpening),
      c("input", { 
        domProps: {
          value: self.data.settings.password
        },
        on: {
          input(e) {
            const value  = e.target.value
            self.data.settings.password = value
          },
          keyup(e) {
            if (e.shiftKey || e.keyCode === 13) {
              const passVal = self.data.settings.password
              if (passVal) {
                const val = self.data.settings.password
                if (val) {
                  if (self.textValidation(val)) {
                    self.saveSetting()
                  }
                }
              }
            }
          }
        },
        attrs: {
          class: 'text-center',
          type: "password",
          placeholder: self.text.phSetPass
        }
       }, self.home.name )
    ])
  }
}

const Opening = (c, self) => {
  if (self.login.process === 'none') {
    return c("div", { attrs: { class: "opening" } }, [
      c("div", {attrs: {class: "tag-top"}}, self.home.tagOne),
      c("div", {attrs: {class: "tag-bottom"}}, self.home.tagTwo),
      c("div", {
        on: {
          click: self.toLogin
        },
        attrs: {
          class: 'btn btn-login'
        }
      }, self.home.btn)
    ])
  } else if (self.login.process === 'toLogin') {
    return c("div", { attrs: { class: "opening open-login" } }, [
      c("div", {attrs: {class: "tag-top up"}}, self.home.tagOne),
      c("div", {attrs: {class: "tag-bottom up"}}, self.home.tagTwo),
      c("input", {
        attrs: {
          class: 'text-center',
          type: 'password',
          class: 'input-login'
        }
      }, self.home.btn)
    ])
  }
};

new Vue({
  data: () => {
    return {
      page: 'home',
      config: {
        language: 'en',
        text: {
          en: {
            firstOpening: 'first time? please let me know about you',
            phFirstOpening: 'your name',
            setPassOpening: 'can you give me passcode for security?',
            phSetPass: 'your passcode',
          }
        }
      },
      text: {},
      home: {
        tagOne: 'Keep Strong',
        tagTwo: 'Broh!',
        btn: 'Login',
        name: ''
      },
      data: {
        first: true,
        login: false,
        settings: {
          name: '',
          password: ''
        },
        todos: [
          {
            title: 'hello'
          }
        ]
      },
      login: {
        process: 'none'
      },
      tabs: null
    }
  },
  render (c) {
    if (this.data.first) {
      return c("div", {attrs: {class: "canva"}}, [
        firstTime(c, this)
      ])
    } else {
      if (this.page === 'home') {
        return c("div", {attrs: {class: "canva"}}, [
          Opening(c, this)
        ])
      } else if (this.page === 'toLogin') {
        return c("div", {attrs: {class: "canva gradi"}}, [
          Opening(c, this)
        ])
      }
    }
  },
  mounted () {
    var self = this
    this.initChange()
    this.checkFirst()
  },
  methods: {
    hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    },
    textValidation(val) {
      const filterSpace = val.replace(/\s/g, '');
      if (val && filterSpace === '') {
        return false
      } else {
        return true
      }
    },
    checkFirst() {
      var self = this;
      chrome.cookies.get({
        url : 'http://junior.dev',
        name: 'first'
      }, (res) => {
        if (res !== null) {
          if (res.value == "false") {
            self.data.first = false
            self.checkLogin()
          } else if (res.value == "true") {
            self.page = 'welcome'
            self.data.first = true
          }
        } else if (res === null) {
          self.page = 'welcome'
          self.data.first = true
          chrome.cookies.set({ 
            url : 'http://junior.dev',
            name: 'first',
            value: "true"
          }, () => {
            console.log('init!')
          })
        }
        self.initLanguage()
      })
    },
    checkLogin() {
      var self = this;
      chrome.cookies.get({
        url : 'http://junior.dev',
        name: 'login'
      }, (res) => {
        if (res !== null) {
          if (res.value == "false") {
            self.data.login = false
            console.log('yas')
          } else if (res.value == "true") {
            self.data.login = true
          }
        } else if (res === null) {
          self.data.login = false
          chrome.cookies.set({ 
            url : 'http://junior.dev',
            name: 'login',
            value: "false"
          }, () => {
            console.log('init!')
          })
        }
      })
    },
    saveSetting() {
      const name  = this.data.settings.name
      const password = btoa(this.data.settings.password)
      const setting = JSON.stringify({
        name,
        password
      })

      chrome.cookies.set({ 
        url : 'http://junior.dev',
        name: 'setting',
        value: setting
      }, () => {
        this.data.first = false
        this.page = 'home'
        chrome.cookies.set({ 
          url : 'http://junior.dev',
          name: 'first',
          value: "false"
        }, () => {
          
        })
      })
    },
    initLanguage() {
      const lg = this.config.language
      const confText = this.config.text

      const checkLanguage = this.hasOwnProp(confText, lg)

      if (checkLanguage) {
        this.text = this.config.text[lg]
      }
    },
    initChange() {
      var self = this
      chrome.cookies.onChanged.addListener((res) => {
        if (res.cookie.domain === 'junior.dev') {
          const name = res.cookie.name
          const value = res.cookie.value

          if (name === 'setting') {
            self.updateSetting(value)
          }
        }
      });
    },
    updateSetting(str) {
      const toObj = JSON.parse(str)
      toObj.password = atob(toObj.password)

      this.data.settings = toObj
    },
    toLogin(val) {
      var self = this;
      this.page = 'toLogin'
      this.login.process = 'toLogin'
      chrome.cookies.set({ 
        url : 'http://junior.dev',
        name: 'login',
        value: JSON.stringify(self.data.login)
      }, () => {
        console.log('berhasil')
      })
    }
  }
}).$mount('#app');