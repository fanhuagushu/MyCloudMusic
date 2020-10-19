/**
 * 封装一个异步的请求工具库
 * 基于 wx.request (ajax) 来实现axios的部分功能
 * 
 * 1.调用返回一个promise （以axios举例）
 * 
 * request({
 *  ...配置
 * }).then(res => {}).catch(err => {})
 * 
 * 
 * 2.配置基准路径
 * 
 * request.defaults.baseURL = "路径"
 * 
 * 
 * 3.错误拦截
 * 
 * request.onError(res => {
 *  // 处理错误
 * })
 *
 */

/**
 * 主函数
 * 
 * @params
 * 参数 | 类型 | 默认值
 * config | Oject | {}
 */
// let requestList = [];
// let authorization = '';
// let is_login = false;
// let showPublish = 2;
// let userId = null;

// 小程序初始化登录
// const firstLogin = () => {
//   wx.login({
//     success: res => {
//       wx.request({
//         url: `${request.defaults.baseURL}/api/login/${res.code}`,
//         success: res => {
//           if (res.data.code === 200) {
//             userId = res.data.data.user.userId;
//             showPublish = res.data.data.showPublish;
//             authorization = 'Bearer ' + res.data.data.token;
//           };
//         }
//       });
//     }
//   });
// }
// firstLogin();


const request = (config = {}) => {
  // 如果url开头没有http，加上基准路径
  if (config.url.search(/^http/) === -1) {
    // 给链接添加url，加上基准路径
    config.url = request.defaults.baseURL + config.url;
  }

  // 返回一个promise
  // resolve是 .then 里面的函数，一般请求成功时候执行
  // reject 是 .catch 里面的函数，一般用于请求失败时候执行
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading();
    // 发起请求
    wx.request({
      ...config,
      // header: {
      //   Authorization: authorization,
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      success(res) {
        if (res.data.code === 500) {
          wx.showToast({
            title: '系统繁忙',
            icon: 'none',
            mask: true,
            duration: 2000
          });
        } else if (res.data.code === 502 || res.data.code === 301 || res.data.code === 400) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            mask: true,
            duration: 2000
          });
        } else {
          resolve(res);
        };
      },
      fail(res) {
        reject(res);
      },
      // 不管成功失败都会执行
      complete(res) {
        wx.hideNavigationBarLoading()
        // 执行错误的兰截器
        request.errors(res);
      }
    })
  })
}

/**
 * request的默认属性
 */
request.defaults = {
  // 基准路径
  baseURL: "http://localhost:3000"
}

/**
 * 存储错误的回调函数.默认是一个空的函数
 */
request.errors = () => {}

/**
 * request的错误拦截
 * 
 * @params
 * callback | 函数 
 */
request.onError = (callback) => {
  // 判断callback必须是一个函数
  if (typeof callback === "function") {
    // 如果是函数，保存到errors
    request.errors = callback
  }
}

// sessionid过时登录
// const login = cb => {
//   requestList.push(cb);
//   if (!is_login) {
//     is_login = true;
//   } else {
//     return
//   }
//   // 登录请求
//   wx.login({
//     success: res => {
//       wx.request({
//         url: `${request.defaults.baseURL}/api/login/${res.code}`,
//         success: res => {
//           if (res.data.code === 200) {
//             userId = res.data.data.user.userId;
//             showPublish = res.data.data.showPublish;
//             authorization = 'Bearer ' + res.data.data.token;
//             // 全部请求回调
//             requestList.forEach(cb => {
//               cb && cb();
//             });
//             requestList = [];
//             is_login = false;
//           };
//         }
//       });
//     }
//   });
// }


// const upload = (filePath) => {
//   // 返回一个promise
//   // resolve是 .then 里面的函数，一般请求成功时候执行
//   // reject 是 .catch 里面的函数，一般用于请求失败时候执行
//   return new Promise((resolve, reject) => {
//     // 发起请求
//     wx.uploadFile({
//       url: request.defaults.baseURL + '/api/upload',
//       filePath: filePath,
//       name: 'file',
//       header: {
//         Authorization: authorization,
//       },
//       success(res) {
//         resolve(res);
//       },
//       fail(res) {
//         reject(res);
//       }
//     })
//   })
// }


// 暴露
// export default request;
module.exports = {
  request: request,
  // upload: upload
}