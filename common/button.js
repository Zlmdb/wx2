
function call() {
  wx.showModal({
    title: '联系房88顾问',
    content: '确认拨打房88顾问电话吗？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
        wx.makePhoneCall({
          phoneNumber: '4009006185' //仅为示例，并非真实的电话号码
        })
      }
    }
  })
}

module.exports = {
  call: call
};