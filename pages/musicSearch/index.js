const app = getApp()
import {
  defaultSearch,
  defaultSearchKeyword,
  hotSearchDetailList
} from '../../api/search'

Page({
  data: {
    menuTop: 0,
    menuHeight: 0,
    defaultSearchKeywordValue: '',
    historySearchList: [],
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

    wx.getStorage({
      key: 'historySearch',
      success: (res) => {
        this.setData({
          historySearchList: res.data
        });
      }
    });

    this.getDefaultKeyWord();
    this.getHotSearchDetail();
  },

  getDefaultKeyWord() {
    defaultSearchKeyword().then(res => {
      if (res.data.code === 200) {
        this.setData({
          defaultSearchKeywordValue: res.data.data.showKeyword
        });
      };
    });
  },

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
    // this.SearchApi(value);
    if (value === '') {
      if (this.data.historySearchList.indexOf(this.data.defaultSearchKeywordValue) !== -1) {
        this.data.historySearchList.splice(this.data.historySearchList.indexOf(this.data.defaultSearchKeywordValue), 1);
      };
      this.data.historySearchList.unshift(this.data.defaultSearchKeywordValue);
      this.setData({
        historySearchList: this.data.historySearchList
      });
      wx.setStorage({
        data: this.data.historySearchList,
        key: 'historySearch'
      });
    } else {
      if (this.data.historySearchList.indexOf(value) !== -1) {
        this.data.historySearchList.splice(this.data.historySearchList.indexOf(value), 1);
      };
      this.data.historySearchList.unshift(value);
      this.setData({
        historySearchList: this.data.historySearchList
      });
      wx.setStorage({
        data: this.data.historySearchList,
        key: 'historySearch'
      });
    };
  },

  // 删除历史搜索
  deleteHistorySearch() {
    wx.showModal({
      content: '确定清空搜索历史？',
      success: res => {
        if (res.confirm) {
          this.setData({
            historySearchList: []
          });
          wx.removeStorage({
            key: 'historySearch'
          });
        };
      }
    });
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

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})