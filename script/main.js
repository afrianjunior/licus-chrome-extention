const Canva = (c, self) => {

}

const Opening = (c, self) => {
  if (self.login.process === 'none') {
    return c("div", {attrs: {class: "opening"}}, [
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
    return c("div", {attrs: {class: "opening open-login"}}, [
      c("div", {attrs: {class: "tag-top up"}}, self.home.tagOne),
      c("div", {attrs: {class: "tag-bottom up"}}, self.home.tagTwo),
      c("input", {
        attrs: {
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
      home: {
        tagOne: 'Keep Strong',
        tagTwo: 'Broh!',
        btn: 'Login'
      },
      data: {
        first: true,
        login: false,
        settings: {
          password: '1234'
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
    if (this.page === 'home') {
      return c("div", {attrs: {class: "canva"}}, [
        Opening(c, this)
      ])
    } else if (this.page === 'toLogin') {
      return c("div", {attrs: {class: "canva gradi"}}, [
        Opening(c, this)
      ])
    }
  },
  mounted () {
    var self = this;
    this.initChange();
    this.checkLogin();
  },
  methods: {
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
    initChange() {
      chrome.cookies.onChanged.addListener((res) => {
        if (res.cookie.domain === 'junior.dev') {
          console.log(res)
        }
      });
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