// learning.js
Page({
    data: {
      userInfo: {},
      learningLanguage: '',
      welcomeMessage: ''
    },
    
    onLoad() {
      const app = getApp();
      const userInfo = app.globalData.userInfo;
      const learningLanguage = app.globalData.learningLanguage;
      
      let welcomeMessage = '';
      if (learningLanguage === 'chinese') {
        welcomeMessage = '欢迎来到你的中文学习之旅！';
      } else {
        welcomeMessage = 'Welcome to your English learning journey!';
      }
      
      this.setData({
        userInfo,
        learningLanguage,
        welcomeMessage
      });
    }
  })
  