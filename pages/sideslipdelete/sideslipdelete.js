var app = getApp();
var moveXList = [0, 0]//X轴移动的距离
Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function () {
    for (var i = 0; i < 10; i++) {
      this.data.items.push({
        content: i + " 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
        isTouchMove: false //默认全隐藏删除
      })
    }
    this.setData({
      items: this.data.items
    })
  },
　　/**
   * 轻触回收指定删除按钮
   */
  tapBackDelBtn: function (e) {
    var matIndex = e.currentTarget.dataset.matindex
    that.backDelBtn(matIndex)
  },
  /**
   * 收回弹出删除按钮
   * matIndex:skuBody下标
   * 如果不传表示全部收回
   */
  backDelBtn: function (matIndex) {
    if (!vpUtilService.vpIsNull(matIndex)) {
      that.data.matList.forEach(function (item, index) {
        item.moveLeft = 0
      })
    } else {
      that.data.matList[matIndex].moveLeft = 0
    }
    that.setData({ matList: that.data.matList })
  },
  /**
   * bindtouchmove
   */
  touchMoveToDel: function (e) {
    if (e.touches.length != 1) { return }
    if (moveXList[1] == 0) {
      moveXList.shift()
      moveXList.push(e.touches[0].clientX)
      return
    } var matIndex = e.currentTarget.dataset.matindex
    var moveLeft = that.data.matList[matIndex].moveLeft
    if ((moveLeft <= 0) || (moveLeft > -64)) {//移动范围在 -64px~0之间
      var dis = moveXList[1] - moveXList[0]
      moveLeft = parseInt(moveLeft ? moveLeft : 0) + parseInt(dis)
      moveLeft = moveLeft < -64 ? -64 : moveLeft
      moveLeft = moveLeft > 0 ? 0 : moveLeft
      moveXList.shift()
      moveXList.push(e.touches[0].clientX)
      that.data.matList[matIndex].moveLeft = moveLeft
      that.setData({ matList: that.data.matList })
    }

  },
  /**
  * bindtouchend
  */
  touchEndToDel: function (e) {
    var matIndex = e.currentTarget.dataset.matindex
    var moveLeft = that.data.matList[matIndex].moveLeft
    if (moveLeft < -32) {//移动超过一半的距离,弹出删除按钮
      that.data.matList[matIndex].moveLeft = -64
    } else {//小于一半的距离,收回
      that.data.matList[matIndex].moveLeft = 0
    }
    that.setData({ matList: that.data.matList })
  },
  /**
  * bindtouchstart
  */
  touchStartToDel: function (e) {
    moveXList = [0, 0]
  }
})