Page({
  data: {
    audioContext: null,
    musicPlay: false
  },

  onLoad(options) {
    this.setData({
      ...options
    });

    this.musicDetails(options.id);
    this.musicUrl(options.id);
  },

  // 歌曲详情
  musicDetails(id) {
    wx.request({
      url: `http://localhost:3000/song/detail?ids=${id}`,
      success: res => {
        console.log(res);
        if (res.data.code === 200) {

        };
      }
    });
  },

  // 歌曲播放地址
  musicUrl(id) {
    wx.request({
      url: `http://localhost:3000/song/url?id=${id}&br=320000`,
      success: res => {
        if (res.data.code === 200) {
          let {
            data
          } = res.data;
          let audio = wx.createInnerAudioContext();
          audio.src = data[0].url;
          audio.autoplay = true;
          audio.loop = true;
          audio.play();
          this.setData({
            audioContext: audio,
            musicPlay: true
          });
        };
      }
    });
  },

  // 播放
  startMusic() {
    this.data.audioContext.play();
    this.setData({
      musicPlay: true
    });
  },
  // 暂停
  pauseMusic() {
    this.data.audioContext.pause();
    this.setData({
      musicPlay: false
    });
  }
})