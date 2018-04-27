// pages/houseDetail1/houseDetail1.js
const { isImmutable, Map, List, Stack, fromJS, is } = require('../../utils/immutable.min.js')
const { toProgramFecture,call}=require('../../common/button.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    is_plus_value:false,
    projectId:'',
    project_type:"项目"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    
    // wx.setNavigationBarColor({
    //   frontColor: '#9BD2EB',
    //   backgroundColor: '#587594',
    //   animation: {
    //     duration: 4000,
    //     timingFunc: 'easeIn'
    //   }
    // })
    
    let projectId = options.projectid
    that.setData({
      projectId: projectId
    })
    wx.request({
      url: getApp().globalData.url +'/info/project/'+that.data.projectId, //
      method: 'get',
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res){
        wx.hideLoading()
        //根据返回的数据进行一些判读
        if (res.data.plus_value!==''){//判断是否显示基本信息里的特殊包租服务
          that.setData({
            is_plus_value:true
          })
        }else{
          that.setData({
            is_plus_value: false
          })
        }
        if (res.data.project_type === 'project'){//判断是项目还是房源
            // that.setData({
            //   project_type:''
            // })
            wx.setNavigationBarTitle({
              title: '房88甄选项目'
            })
        }else{
          // that.setData({
          //   project_type: ''
          // })
          wx.setNavigationBarTitle({
            title: '房88甄选房源'
          })
        }
        // console.log(res.data)
        //数据处理
        let changeData, arrNew=[];
        let data = fromJS(res.data)
        let data1 = data.update('estimated_yearly_return', value => (parseFloat(value)).toFixed(4) * 100 + '%')
        let data2 = data1.update('bedrooms_min', value => parseInt(value))
        let data4 = data2.update('bedrooms_max', value => parseInt(value))
        // let data33 = data3.update('layout_photo_json', value => JSON.parse(value))
        // let data4 = data33.update('photo_json', value => JSON.parse(value))
        let arrTag=data4.get('tags')
        arrTag.forEach((value,index,arr) => {
          switch (value){
            case 'school':
              arrNew.push('学区房');
              break;
            case 'subway':
              arrNew.push('近地铁');
              break;
            case 'inc':
              arrNew.push('历史涨幅高');
              break;
            case 'env':
              arrNew.push('环境优越');
              break;
            case 'rich':
              arrNew.push('富人区');
              break;
            case 'invest':
              arrNew.push('投资房');
              break;
            case 'low_dep':
              arrNew.push('低首付');
              break;
            case 'ready':
              arrNew.push('拎包入住');
              break;
            case 'low_pri':
              arrNew.push('低总价');
              break;
            case 'cbd':
              arrNew.push('核心地段');
              break;
            case 'decorate':
              arrNew.push('精装修');
              break;
            case 'garden':
              arrNew.push('花园洋房');
              break;
          }
        })
        let data5 = data4.set('tags_zh', arrNew)
        let property_type = data5.get('property_type')
        switch (property_type) {
          case 'house':
            changeData = data5.set('property_type_zh', '独栋别墅');
            break;
          case 'apartmenet':
            changeData = data5.set('property_type_zh', '公寓');
            break;
          case 'townhouse':
            changeData = data5.set('property_type_zh', '联排别墅');
            break;
          case 'multi-family house':
            changeData = data5.set('property_type_zh', '多户住宅');
            break;
        }
        that.setData({
          data: changeData.toJS()
        })
        console.log(changeData.toJS())
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
  toProgramFecture:function(){
    wx.navigateTo({
      url: '../programFeatures/programFeatures?projectid=' + this.data.projectId
    })
  },
  call:function(){
    call()
  }
})