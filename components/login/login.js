Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    menuTop: 0,
    menuHeight: 0,
    loginCoverShow: false,
    loginType: 'phone',
    phoneValue: '',
    isRegister: false,
    passwordInputShow: false,
    isHavePassword: false,
    passwordValue: ''
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
    // 登录
    confirmLogin() {
      wx.request({
        url: `http://localhost:3000/login/cellphone?phone=${this.data.phoneValue}&password=${this.data.passwordValue}&timestamp=${new Date().getTime()}`,
        success: res => {
          console.log(res);
          if (res.data.code === 200) {
            this.getUserDetails(res.data.profile.userId);
          };
        }
      });
    },
    // 查询登录状态
    queryLogin() {
      wx.request({
        url: `http://localhost:3000/login/status?timestamp=${new Date().getTime()}`,
        success: res => {
          console.log(res);
          if (res.data.code === 200) {

          };
        }
      });
    },
    // 获取用户详情
    getUserDetails(uid) {
      wx.request({
        url: `http://localhost:3000/user/detail?uid=${uid}`,
        success: res => {
          console.log(res);
          if (res.data.code === 200) {

          };
        }
      });
    },
    // 检测手机号码是否已注册
    checkPhone() {
      if (this.data.phoneValue.length !== 11) {
        wx.showToast({
          title: '请输入11位手机号',
          icon: 'none'
        });
        return
      };
      wx.request({
        url: `http://localhost:3000/cellphone/existence/check?phone=${this.data.phoneValue}&countrycode=86`,
        success: res => {
          if (res.data.code === 200) {
            // 是否注册了
            if (res.data.exist === -1) {
              this.setData({
                isRegister: false
              });
            } else if (res.data.exist === 1) {
              this.setData({
                isRegister: true
              });
              // 是否有密码
              if (this.data.hasPassword) {
                this.setData({
                  isHavePassword: true
                });
              } else {
                this.setData({
                  isHavePassword: true
                });
              };
            };
            this.setData({
              passwordInputShow: true
            });
          };
        }
      });
    },
    // 手机号输入
    phoneInput(e) {
      let {
        value
      } = e.detail;
      this.setData({
        phoneValue: value
      });
    },
    // 密码输入
    passwordInput(e) {
      let {
        value
      } = e.detail;
      this.setData({
        passwordValue: value
      });
    },
    // 选择手机号登录
    phoneLogin() {
      this.setData({
        loginType: 'phone',
        loginCoverShow: true
      });
    },
    // 选择邮箱登录
    mailLogin() {

    },
    // 隐藏登录弹窗
    hideCoverLogin() {
      this.setData({
        loginCoverShow: false
      });
    }
  }
})