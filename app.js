// app.js
App({
  onLaunch() {
    // Get stored user data
    const userInfo = wx.getStorageSync('userInfo') || null;
    const learningLanguage = wx.getStorageSync('learningLanguage') || '';
    
    // Set global data
    this.globalData.userInfo = userInfo;
    this.globalData.learningLanguage = learningLanguage;
    
    // Log access
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // Login
    wx.login({
      success: res => {
        // Send res.code to backend to get openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    learningLanguage: ''
  }
})
