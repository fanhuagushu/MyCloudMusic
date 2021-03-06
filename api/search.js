import {
  request
} from '../utils/request';

/**
 * 搜索
 * type : 搜索类型,对应以下类型,默认为 1 即单曲
 * 1 : 单曲
 * 10 : 专辑
 * 100 : 歌手
 * 1000 : 歌单
 * 1002 ：用户
 * 1004 ：MV
 * 1006 ：歌词
 * 1009 ：电台
 * 1014 ：视频
 * 1018 ：综合
 */
const defaultSearch = (keywords, type, pageNum, pageSize) => request({
  url: `/search?keywords=${keywords}&type=${type}&limit=${pageSize}&offset=${pageNum}`
})

const defaultSearchKeyword = () => request({
  url: '/search/default'
})

const hotSearchList = () => request({
  url: '/search/hot'
})

const hotSearchDetailList = () => request({
  url: '/search/hot/detail'
})

const searchSuggest = (keywords) => request({
  url: `/search/suggest?keywords=${keywords}`
})

module.exports = {
  defaultSearch,
  defaultSearchKeyword,
  hotSearchList,
  hotSearchDetailList,
  searchSuggest
}