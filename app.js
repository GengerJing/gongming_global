const express = require('express')
const app = express()

const cookie = require('cookie')

app.use(require('body-parser').json({
  strict: true, limit: '128mb'
}))

const session = require('express-session')
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*10 //过期时间设置(单位毫秒)
  }
}))

/*
 * 身份认证
 */
app.use((req, res, next) => {
  if (req.path === '/sign_in') {
    return next()
  }

  if (req.session.user) {
    return next()
  }

  res.status(401).send('请先登录')
})

const router = express.Router()
router.post('/sign_in', (req, res, next) => {

  var mock_user = {
    username: 'jing',
    password: '123',
  }
  var user = req.body
  if (user.username === mock_user.username
  && user.password === mock_user.password) {
    req.session.user = user
    return res.status(200).send('用户登录成功')
  }
  return res.status(401).send('用户登录失败')
})

router.post('/add_notice', (req, res, next) => {
  res.status(200).send('success add notice')
})

app.use(router)


app.use((req, res, next) => {
  res.status(404).send('API path error，请联系管理员')
})

app.use((err, req, res, next) => {
  res.status(500).send('后端服务异常，请联系管理员, error:' + err)
})


app.listen(3000)


