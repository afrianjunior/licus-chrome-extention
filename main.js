new Vue({
    data: function () {
        return {
            msg: 'Hello Jun'
        }
    },
    render (createElement) {
      return createElement("div", {attrs: {class: "opening"}}, [this.msg])
    },
    mounted () {
        setTimeout(() => {
            this.msg = `It's me, Karla`
        }, 3000)
        setTimeout(() => {
            this.msg = `Your personal assistant`
        }, 4000)
    }
  }).$mount('#app');