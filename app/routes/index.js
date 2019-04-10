const router = require('koa-router')();

// 数据校验
const parameter = require('../utils/parameter');
// token校验
const {checkToken} = require('../utils/tool/token');
// 验证码校验
const {checkCode} = require('../utils/tool/verification');

const {op, userSinger} = require('../controllers/sys');
const {get, post} = require('../controllers/test');
const {code} = require('../controllers/verification');
const {index} = require('../controllers/index');
const {fzf} = require('../controllers/fzf');

// op
router.post('/music/sys/op', op);
router.get('/music/sys/userSinger', userSinger);
// test
router.get('/music/test/get', get);
router.post('/music/test/post', post);
// verification
router.get('/music/verification/code', parameter, code);
// index
router.get('/', index);
// fzf
router.get('*', fzf);

module.exports = router;
