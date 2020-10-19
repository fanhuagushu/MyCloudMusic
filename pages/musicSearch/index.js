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
    searchValue: '',
    historySearchList: [],
    hotSearchKeywordsList: [],
    moreSearchOpen: false,
    musicList: [],
    isSearch: false
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
    defaultSearch(keywords, 1, 0, 20).then(res => {
      console.log(res);
      if (res.data.code === 200) {

      };
    });
  },
  // 搜索
  handleSearch(e) {
    let {
      value
    } = e.detail;
    if (value === '') {
      if (this.data.historySearchList.indexOf(this.data.defaultSearchKeywordValue) !== -1) {
        this.data.historySearchList.splice(this.data.historySearchList.indexOf(this.data.defaultSearchKeywordValue), 1);
      };
      this.data.historySearchList.unshift(this.data.defaultSearchKeywordValue);
      this.setData({
        historySearchList: this.data.historySearchList,
        searchValue: this.data.defaultSearchKeywordValue,
        isSearch: true
      });
      wx.setStorage({
        data: this.data.historySearchList,
        key: 'historySearch'
      });
      this.SearchApi(this.data.defaultSearchKeywordValue);
    } else {
      if (this.data.historySearchList.indexOf(value) !== -1) {
        this.data.historySearchList.splice(this.data.historySearchList.indexOf(value), 1);
      };
      this.data.historySearchList.unshift(value);
      this.setData({
        historySearchList: this.data.historySearchList,
        searchValue: value,
        isSearch: true
      });
      wx.setStorage({
        data: this.data.historySearchList,
        key: 'historySearch'
      });
      this.SearchApi(value);
    };
  },
  // 点击搜索
  clickSearch(e) {
    let {
      value
    } = e.currentTarget.dataset;
    this.setData({
      searchValue: value,
      isSearch: true
    });
    this.SearchApi(value);
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
    if (this.data.isSearch) {
      this.setData({
        isSearch: false
      });
    } else {
      wx.navigateBack({
        delta: 1
      });
    };
  }
})