// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    appTitle: 'LinguaBridge',
    appSubtitle: 'Master Chinese & English with ease',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    selectedLanguage: '',
    languages: [
      { id: 'chinese', name: '中文 Chinese' },
      { id: 'english', name: 'English 英语' }
    ],
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: this.isFormComplete(),
    })
  },
  
  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: this.isFormComplete(),
    })
  },
  
  onLanguageChange(e) {
    this.setData({
      selectedLanguage: e.detail.value,
      hasUserInfo: this.isFormComplete(),
    })
  },
  
  isFormComplete() {
    const { avatarUrl, nickName } = this.data.userInfo;
    return nickName && 
           avatarUrl && 
           avatarUrl !== defaultAvatarUrl && 
           this.data.selectedLanguage;
  },
  
  signUp() {
    if (!this.isFormComplete()) {
      wx.showToast({
        title: 'Please complete all fields',
        icon: 'none'
      });
      return;
    }
    
    // Save user info to global data
    const app = getApp();
    app.globalData.userInfo = this.data.userInfo;
    app.globalData.learningLanguage = this.data.selectedLanguage;
    
    // Save to storage for persistence
    wx.setStorageSync('userInfo', this.data.userInfo);
    wx.setStorageSync('learningLanguage', this.data.selectedLanguage);
    
    // Proceed with WeChat login
    wx.login({
      success: (res) => {
        if (res.code) {
          // Here you would typically send the code to your backend
          // For now, we'll just navigate to the next screen
          wx.showToast({
            title: 'Sign up successful!',
            icon: 'success',
            duration: 2000,
            success: () => {
              // Navigate to the main learning screen (to be created)
              setTimeout(() => {
                wx.navigateTo({
                  url: '../learning/learning'
                });
              }, 2000);
            }
          });
        } else {
          wx.showToast({
            title: 'Login failed',
            icon: 'none'
          });
        }
      }
    });
  }
})
