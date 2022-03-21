const router = require('koa-router')()
const swaggerJsdoc = require('swagger-jsdoc')
const { join } = require('path')

const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      description: '服务端',
      version: '1.0.0',
      title: '服务端'
    },
    host: '',
    basePath: '/',
    tags: [
      {
        name: 'server',
        description: 'auth'
      }
    ],
    schemes: ['http', 'https'],
    // components: {
    //   schemas: {
    //     Order: {
    //       type: 'object'
    //     }
    //   },
    //   securitySchemes: {
    //     BasicAuth: { type: 'http', scheme: 'basic' }
    //   }
    // }
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [join(__dirname, '../controllers/*.js')]
}
const openapiSpecification = swaggerJsdoc(options)
// 数据校验
const parameter = require('../utils/parameter')
// token校验
const { checkToken } = require('../utils/tool/token')
// 验证码校验
const { checkCode } = require('../utils/tool/verification')

const { op, userSinger } = require('../controllers/sys')
const { get, post } = require('../controllers/test')
const { code } = require('../controllers/verification')
const { index } = require('../controllers/index')
const { fzf } = require('../controllers/fzf')

// op
router.post('/music/sys/op', op)
router.get('/music/sys/userSinger', userSinger)
// test
router.get('/music/test/get', get)
router.post('/music/test/post', post)
// verification
router.get('/music/verification/code', parameter, code)
// swagger
router.get('/music/api/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = openapiSpecification
})
// index
router.get('/', index)
// fzf
router.get('*', fzf)

module.exports = router
