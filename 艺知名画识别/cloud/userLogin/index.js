// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('云函数被调用')
  console.log('event:', event)
  
  try {
    const { code, userInfo } = event
    
    if (!code) {
      return {
        success: false,
        message: '缺少登录凭证code'
      }
    }
    
    if (!userInfo) {
      return {
        success: false,
        message: '缺少用户信息'
      }
    }
    
    // 获取微信上下文
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const appid = wxContext.APPID
    
    console.log('微信上下文:', { openid, appid })
    
    // 获取数据库
    const db = cloud.database()
    const userCollection = db.collection('users')
    
    // 检查用户是否存在
    const userResult = await userCollection.where({
      openid: openid
    }).get()
    
    const currentTime = new Date()
    let userData
    
    if (userResult.data.length === 0) {
      // 新用户
      const newUserData = {
        openid: openid,
        appid: appid,
        nickName: userInfo.nickName || '微信用户',
        avatarUrl: userInfo.avatarUrl || '',
        gender: userInfo.gender || 0,
        country: userInfo.country || '',
        province: userInfo.province || '',
        city: userInfo.city || '',
        language: userInfo.language || 'zh_CN',
        loginCount: 1,
        createTime: currentTime,
        lastLoginTime: currentTime,
        isActive: true
      }
      
      const addResult = await userCollection.add({
        data: newUserData
      })
      
      userData = {
        _id: addResult._id,
        ...newUserData
      }
      
      console.log('新用户创建成功')
      
    } else {
      // 老用户
      const existingUser = userResult.data[0]
      
      await userCollection.doc(existingUser._id).update({
        data: {
          nickName: userInfo.nickName || existingUser.nickName,
          avatarUrl: userInfo.avatarUrl || existingUser.avatarUrl,
          gender: userInfo.gender || existingUser.gender,
          country: userInfo.country || existingUser.country,
          province: userInfo.province || existingUser.province,
          city: userInfo.city || existingUser.city,
          language: userInfo.language || existingUser.language,
          loginCount: (existingUser.loginCount || 0) + 1,
          lastLoginTime: currentTime,
          isActive: true
        }
      })
      
      userData = {
        ...existingUser,
        loginCount: (existingUser.loginCount || 0) + 1,
        lastLoginTime: currentTime
      }
      
      console.log('老用户登录信息更新成功')
    }
    
    return {
      success: true,
      message: '登录成功',
      data: {
        openid: userData.openid,
        userId: userData._id,
        nickName: userData.nickName,
        avatarUrl: userData.avatarUrl,
        loginCount: userData.loginCount,
        lastLoginTime: userData.lastLoginTime,
        createTime: userData.createTime
      }
    }
    
  } catch (error) {
    console.error('登录云函数错误:', error)
    
    return {
      success: false,
      message: '登录失败：' + error.message,
      error: error.toString()
    }
  }
}