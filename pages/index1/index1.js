// pages/index1/index1.js
const { isImmutable, Map, List, Stack, fromJS,is }=require('../../utils/immutable.min.js')
const {indexData}=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [],
    listData:[],
    page:1,
    isPageBottom:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var ari = "http://img.fang88.com/"
    var photo = { 
    "path1": "26fea722de6474320c224c55c1df6a2e.jpg", 
    "path2": "f321935023dddee6bc18aed40ddf12a4.jpg", 
    "path3": "cce25252f5a42142627729251386cf5f.jpg", 
    "path4": "0178fdf1983106fa220708cbebe7754d.jpg", 
    "path5": "8a3c2039f4aeab4435eb9edbf2e05e2b.jpg", 
    "path6": "63e681b023c3f5c30c6fd76e3b83a502.jpg"}
    var arr=[]
    for (var item in photo){
      arr.push(ari + photo[item])
    }
    console.log(arr)
    this.setData({
      photo: arr
    })
    
    wx.request({
      url: getApp().globalData.url + '/info/list/?page=' + that.data.page, //仅为示例，并非真实的接口地址
      // data: {
      // },
      method: 'get',
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
        //数据初步判断
        
        that.setData({//请求成功之后，把页数改为2
          page:2
        })
        let data=fromJS(res.data)
        let newData=indexData(data)//调用数据处理函数
        console.log('immutable', newData.toJS())
        that.setData({
          listData: newData.toJS()
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
    let that=this
    wx.request({
      url: getApp().globalData.url + '/info/list/?page=' + that.data.page,
      // data: {
      //   x: '',
      //   y: ''
      // },
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        
        if (res.data.length !==0 ){
          that.setData({//请求成功之后，把页数改为2
            page: that.data.page++
          })
          let data = fromJS(res.data)
          let newData = indexData(data)//调用数据处理函数
          console.log('immutable', newData.toJS())

          that.setData({
            listData: that.data.listData.concat(newData.toJS())
          })
        }else{
          // wx.showToast({
          //   title: '到底啦',
          //   icon:'none',
          //   duration: 500
          // })
          that.setData({
            isPageBottom:true
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  toPage:function(e){
    let projectid = e.currentTarget.dataset.projectid
    wx.navigateTo({
      url: '../houseDetail1/houseDetail1?projectid=' + projectid,
    })
  }
})