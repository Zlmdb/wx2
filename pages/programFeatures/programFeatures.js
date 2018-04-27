// pages/programFeatures/programFeatures.js
var WxParse = require('../../wxParse/wxParse.js');
const { call } = require('../../common/button.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    let projectId = options.projectid
    that.setData({
      projectId: projectId
    })
    wx.request({
      url: getApp().globalData.url + '/info/project-detail/' + that.data.projectId,
      // data: {
      // },
      method: 'get',
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        WxParse.wxParse('article', 'html', res.data, that, 5);
        that.setData({
          listData: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  call: function () {
    call()
  }
})