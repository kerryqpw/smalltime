

let col1H = 0;
let col2H = 0;

Page({

  data: {
    leftText: '左',
    rightText: '右',
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  onLoad: function () {

    wx.setNavigationBarTitle({
      title: '瀑布流'
    });

    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages();
      }
    });

  },
  PullDownRefresh:function(){
    console.log("页面下拉2");   

  },
    onShow: function () {
      console.log("页面显示");   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏");   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("点击分享");   
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;


    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      imageObj.description="左";
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
      imageObj.description = "右";
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },
  gotoRichTextPage3:function (e) {
    var id=e.currentTarget.id;
    wx.navigateTo({
      url: '../richText/richText?id=' + id,
    })
  },

  loadImages: function () {
    let images = [
      { pic: "../../images/1.png", height: 0,description:"right"},
      { pic: "../../images/2.png", height: 0, description: "right" },
      { pic: "../../images/3.png", height: 0, description: "right" },
      { pic: "../../images/4.png", height: 0, description: "right" },
      { pic: "../../images/5.png", height: 0, description: "right" },
      { pic: "../../images/6.png", height: 0, description: "right" },
      { pic: "../../images/7.png", height: 0, description: "right" },
      { pic: "../../images/8.png", height: 0, description: "right" },
      { pic: "../../images/9.png", height: 0, description: "right" },
      { pic: "../../images/10.png", height: 0, description: "right" },
      { pic: "../../images/11.png", height: 0, description: "right" },
      { pic: "../../images/12.png", height: 0, description: "right" },
      { pic: "../../images/13.png", height: 0, description: "right"},
      { pic: "../../images/14.png", height: 0, description: "right"}
    ];

    console.log("dasddasd" + images);


    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
  }

})

