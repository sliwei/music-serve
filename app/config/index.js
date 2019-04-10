/**
 * lw 配置文件
 */
module.exports = {
  port: 3007, // 端口
  tokenObs: 'chat-serve', // token混淆码
  verificationObs: 'chat-serve', // 验证码混淆码
  verificationSta: true, // 启用验证码
  cookieOptions: {
    maxAge: 1000 * 3600 * 48,
    path: '/',
    httpOnly: false
  },
};
