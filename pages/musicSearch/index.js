const app = getApp()
import {
  defaultSearch,
  defaultSearchKeyword,
  hotSearchList,
  hotSearchDetailList,
  searchSuggest
} from '../../api/search'

Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    musicList: []
  },

  onLoad() {
    let menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
    });
  },

  getHotSearch() {

  },

  // 搜索请求
  SearchApi(keywords) {
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
    this.SearchApi(value);
  },

  // 歌曲详情
  musicDetails(e) {
    let {
      id
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/musicDetails/index?id=${id}`,
    });
  }
})