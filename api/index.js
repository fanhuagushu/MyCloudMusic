import {
  request
} from '../utils/request';

/**
 * 首页轮播图
 * type : 资源类型,对应以下类型,默认为 0 即PC
 * 0 : pc
 * 1 : 安卓
 * 2 : 爱疯
 * 3 : 爱怕的
 */
const getBanner = (type) => request({
  url: `/banner?type=${type}`
})

// Nav
const getNav = () => request({
  url: '/homepage/block/page'
})

// 歌单推荐
const getRecommendMusicList = () => request({
  url: '/personalized'
})


// 新音乐推荐
const getRecommendNewMusic = () => request({
  url: '/personalized/newsong'
})

// 电台推荐
const getRecommendRadio = () => request({
  url: '/personalized/djprogram'
})

// 独家放送
const getExclusiveBroadcast = () => request({
  url: '/personalized/privatecontent'
})

module.exports = {
  getBanner,
  getNav,
  getRecommendMusicList,
  getRecommendNewMusic,
  getRecommendRadio,
  getExclusiveBroadcast
}