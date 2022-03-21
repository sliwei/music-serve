const axios = require('axios')

/**
 * lw op
 */
const sys = async (ctx, next) => {
  let dat = ctx.request.body
  let userinfo = await axios.get(encodeURI(dat.url))
  ctx.DATA.data = userinfo.data
  ctx.body = ctx.DATA
}

/**
 * lw userSinger
 */
const userSinger = async (ctx, next) => {
  ctx.DATA.data = {
    singer: [],
    play: {
      hash: '',
      currentTime: 85,
      volume: 1,
      playType: 1
    }
  }
  ctx.body = ctx.DATA
}

module.exports = {
  op: sys,
  userSinger
}
