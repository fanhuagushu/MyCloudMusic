const app = getApp()
import {
  getBanner,
  getNav,
  getRecommendMusicList,
  getRecommendNewMusic,
  getRecommendRadio,
  getExclusiveBroadcast
} from '../../api/index'

Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    swiperList: [],
    indexInfo: [],
    newTab: 0,
    newSongCD: 0
  },

  onLoad() {
    let menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
    });
    this.getSwiperList();
    this.getIndexNav();
  },

  // 获取轮播图
  getSwiperList() {
    getBanner(1).then(res => {
      if (res.data.code === 200) {
        this.setData({
          swiperList: res.data.banners
        });
      };
    });
  },

  // 主页信息
  getIndexNav() {
    getNav().then(res => {
      if (res.data.code === 200) {
        this.setData({
          indexInfo: res.data.data.blocks
        });
      };
    });
  },

  // 点击轮播图
  swiperJump(e) {
    let {
      index
    } = e.currentTarget.dataset;
    if (this.data.swiperList[index].song) {
      wx.navigateTo({
        url: `/pages/musicDetails/index?id=${this.data.swiperList[index].song.id}`,
      });
    };
  },

  // 新歌新碟切换
  changeNewTab(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      newTab: index,
      newSongCD: 0
    });
  }
})