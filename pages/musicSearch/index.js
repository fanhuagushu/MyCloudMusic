const app = getApp()

Page({
  data: {
    musicList: [],
    goLogin: false
  },

  onLoad() {
    // this.getMusic('修炼爱情');
  },

  // 搜索请求
  getMusic(keywords) {
    wx.request({
      url: `http://localhost:3000/search?keywords=${keywords}`,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            musicList: res.data.result.songs
          });
        };
      }
    });
  },

  // 搜索
  handleSearch(e) {
    let {
      value
    } = e.detail;
    this.getMusic(value);
  },

  // 歌曲详情
  musicDetails(e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/musicDetails/index?id=${id}`,
    });
  },

  showLogin() {
    this.setData({
      goLogin: true
    });
  }
})