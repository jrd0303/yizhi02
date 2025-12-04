Page({
  data: {
    feedbackContent: '',
    imageList: [],
    charCount: 0
  },

  onFeedbackInput(e) {
    const content = e.detail.value;
    const count = content.length;
    this.setData({
      feedbackContent: content,
      charCount: count
    });
  },

  // 选择图片函数
  chooseImage() {
    const that = this;
    const maxCount = 9 - this.data.imageList.length; // 计算还能上传的图片数量
    
    wx.chooseImage({
      count: maxCount, // 最多选择的图片数量
      sizeType: ['original', 'compressed'], // 可以选择原图或压缩图
      sourceType: ['album', 'camera'], // 可以从相册选择或使用相机
      success(res) {
        // 将新选择的图片添加到现有图片列表中
        const newImageList = that.data.imageList.concat(res.tempFilePaths);
        that.setData({
          imageList: newImageList
        });
        wx.showToast({
          title: '图片添加成功',
          icon: 'success'
        });
      },
      fail(err) {
        console.error('选择图片失败:', err);
        if (err.errMsg !== 'chooseImage:fail cancel') {
          wx.showToast({
            title: '选择图片失败',
            icon: 'none'
          });
        }
      }
    });
  },
  
  // 删除图片函数
  deleteImage(e) {
    const index = e.currentTarget.dataset.index;
    const newImageList = this.data.imageList;
    newImageList.splice(index, 1); // 从数组中删除指定索引的图片
    this.setData({
      imageList: newImageList
    });
  },

  // 提交反馈
  submitFeedback() {
    const { feedbackContent, imageList } = this.data;
    
    // 表单验证
    if (!feedbackContent.trim()) {
      wx.showToast({
        title: '请填写反馈内容',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载提示
    wx.showLoading({
      title: '提交中...',
    });
    
    try {
      // 构建提交数据
      const submitData = {
        content: feedbackContent,
        imageCount: imageList.length,
        timestamp: new Date().getTime()
      };
      
      // 模拟上传文字内容（实际项目中应该替换为真实的上传API）
      // 这里先处理文字上传，然后再处理图片上传
      console.log('提交文字内容:', submitData);
      
      // 如果有图片，需要上传图片
      if (imageList.length > 0) {
        this.uploadImages(imageList);
      } else {
        // 没有图片时直接显示成功
        this.handleSubmitSuccess();
      }
    } catch (error) {
      console.error('提交失败:', error);
      wx.hideLoading();
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      });
    }
  },
  
  // 上传图片
  uploadImages(imageList) {
    // 记录已上传的图片数量
    let uploadedCount = 0;
    const totalCount = imageList.length;
    
    // 遍历上传每张图片
    imageList.forEach((tempFilePath, index) => {
      // 模拟上传图片（实际项目中应该替换为真实的上传API）
      console.log(`上传图片 ${index + 1}/${totalCount}:`, tempFilePath);
      
      // 模拟上传成功
      setTimeout(() => {
        uploadedCount++;
        
        // 当所有图片都上传完成时
        if (uploadedCount === totalCount) {
          this.handleSubmitSuccess();
        }
      }, 300);
    });
  },
  
  // 处理提交成功
  handleSubmitSuccess() {
    wx.hideLoading();
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    });
    
    // 2秒后返回上一页
    setTimeout(() => {
      // 清空数据
      this.setData({
        feedbackContent: '',
        imageList: [],
        charCount: 0
      });
      // 返回上一页
      wx.navigateBack();
    }, 2000);
  },
  
  onShareAppMessage() {
    return {};
  },
});