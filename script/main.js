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
    return c("div", {attrs: {class: "opening"}}, [
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
      login: {
        process: 'none'
      }
    }
  },
  render (c) {
    if (this.page === 'home') {
      return c("div", {}, [
        Opening(c, this)
      ])
    }
  },
  mounted () {
    
  },
  methods: {
    toLogin(val) {
      this.login.process = 'toLogin'
    }
  }
}).$mount('#app');