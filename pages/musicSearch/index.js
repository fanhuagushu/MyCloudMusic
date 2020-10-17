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
    musicList: [],
    hotSearchKeywordsList: [],
    moreSearchOpen: false
  },

  onLoad() {
    let menu = wx.getMenuButtonBoundingClientRect();
    this.setData({
      menuTop: menu.top,
      menuHeight: menu.height
    });

    this.getHotSearchDetail();
  },

  // 获取热搜榜
  // getHotSearch() {
  //   hotSearchList().then(res => {
  //     console.log(res);
  //   });
  // },

  // 获取热搜榜
  getHotSearchDetail() {
    hotSearchDetailList().then(res => {
      if (res.data.code === 200) {
        this.setData({
          hotSearchKeywordsList: res.data.data
        });
      };
    });
  },
  // 展开更多热搜
  openMoreHotSearch() {
    this.setData({
      moreSearchOpen: true
    });
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