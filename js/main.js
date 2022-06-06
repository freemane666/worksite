"use strict";

var likeComponent = Vue.extend({
  /*props:['message'],*/
  props: {
    message: {
      type: String,
      default: "Like",
    },
  },
  data: function () {
    return {
      count: 0,
    }
  },
  template: '<button @click="countUp">{{ message }} {{ count }}</button>',
  watch: {
    count: {
      handler: function () {
        localStorage.setItem("count", JSON.stringify(this.count));
      },
    },
  },
  mounted: function () {
    this.count = JSON.parse(localStorage.getItem("count")) || 0;
  },
  methods: {
    countUp: function () {
      this.count++;
      this.$emit("increment");
    },
  },
  // template: '<div><button>Like</button><button>Like</button></div>'
});

const vm = new Vue({
  el: "#app",
  data: {
    names: [],
  },
  watch: {
    names: {
      handler: function () {
        localStorage.setItem("names", JSON.stringify(this.names));
      },
      deep: true,
    },
  },
  mounted: function () {
    this.names = JSON.parse(localStorage.getItem("names")) || [];
  },
  methods: {
    addItem: function () {
      var item = {
        title: this.newName,
        isDone: false,
      };
      this.names.push(item);
      this.newName = "";
    },
    deleteItem: function (index) {
      if (confirm("本当に消去しますか(一度けしたら元に戻りません。)")) {
        this.names.splice(index, 1);
      }
    },
    purge: function (index) {
      if (!confirm("本当に消去しますか(一度けしたら元に戻りません。)")) {
        return;
      }
      this.names = this.listfalse;
    },
  },
  computed: {
    listfalse: function () {
      return this.names.filter(function (name) {
        return !name.isDone;
      });
    },
  },
});

var app = new Vue({
  el: "#app2",
  components: {
    "like-component": likeComponent,
  },
  data: {
    total: 0,
  },
  watch: {
    total: {
      handler: function () {
        localStorage.setItem("total", JSON.stringify(this.total));
        
      },
    },
    mounted: function () {
          this.total = JSON.parse(localStorage.getItem("total")) || 0;
        },
  },
  methods: {
    incrementTotal: function () {
      this.total++;
    },
  },
});
