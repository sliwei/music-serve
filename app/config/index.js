/**
 * lw 配置文件
 */
module.exports = {
  port: 3007, // 端口
  tokenObs: 'music-serve', // token混淆码
  verificationObs: 'music-serve', // 验证码混淆码
  verificationSta: true, // 启用验证码
  cookieOptions: {
    maxAge: 1000 * 3600 * 48,
    path: '/',
    httpOnly: false
  },
};
