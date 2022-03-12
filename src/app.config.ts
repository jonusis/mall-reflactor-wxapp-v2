export default defineAppConfig({
  pages: [
    'pages/index/index',
    "pages/add/index",
    "pages/add/add",
    "pages/person/index",
    "pages/tabList/index",
    "pages/login/index",
    "pages/detail/index",
    "pages/record/index",
    "pages/personMessage/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      pagePath: "pages/index/index",
      text: "首页",
      iconPath: "./static/image/home.png",
      selectedIconPath: "./static/image/home-a.png"
    }, {
      pagePath: "pages/add/index",
      text: "发起拼单",
      iconPath: "./static/image/circle.png",
      selectedIconPath: "./static/image/circle-a.png"
    },{
      pagePath: "pages/person/index",
      text: "个人主页",
      iconPath: "./static/image/me.png",
      selectedIconPath: "./static/image/me-a.png"
    }],
    color: '#333',
    selectedColor: 'red',
    backgroundColor: '#fff',
    borderStyle: 'white'
  }
})
