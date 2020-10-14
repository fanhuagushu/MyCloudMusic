Component({
  properties: {

  },
  data: {
    menuTop: 0,
    menuHeight: 0
  },
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached() {
      let menu = wx.getMenuButtonBoundingClientRect();
      this.setData({
        menuTop: menu.top,
        menuHeight: menu.height
      });
    },
    // 在组件实例被从页面节点树移除时执行
    detached() {

    }
  },
  pageLifetimes: {
    // 页面被展示
    show() {},
    // 页面被隐藏
    hide() {},
    // 页面尺寸变化
    resize(size) {}
  },
  methods: {
    goSearch() {
      this.triggerEvent('search');
    }
  }
})