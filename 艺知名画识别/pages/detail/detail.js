Page({
  data: {
    showFullDescription: false,
    description: '《星月夜》是后印象派画家梵·高的代表作之一。在这幅画中，梵·高用夸张的手法，生动地描绘了充满运动和变化的星空。夜晚的天空高又远，大星、小星回旋于夜空，金黄的月亮形成巨大的漩涡，星云的短线条纠结、盘旋，仿佛让人们看见时光的流逝。暗绿褐色的柏树像巨大的火焰，是星夜狂欢的响应者。天空下，安睡的村庄那么宁静、安详。淡蓝的色调，动感的线条，给人自由的时空感。',
    maxLength: 50
  },

  toggleDescription: function() {
    this.setData({
      showFullDescription: !this.data.showFullDescription
    });
  },

  onShareAppMessage() {
    return {};
  },
});