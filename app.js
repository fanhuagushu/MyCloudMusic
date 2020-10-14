App({
  onLaunch() {
    // this.getCountryCode();
  },

  // 国家电话编号
  getCountryCode() {
    wx.request({
      url: 'http://localhost:3000/countries/code/list',
      success: res => {
        if (res.data.code === 200) {
          wx.setStorage({
            data: res.data.data,
            key: 'countryCode'
          });
        };
      }
    });
  },

  globalData: {
    userInfo: {}
  }
})