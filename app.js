const path = require('path')
const express = require('express')
const app = express()

const cookie = require('cookie')


app.set('views', path.join(__dirname, 'views'))
app.engine( '.html', require( 'ejs' ).__express );
app.set('view engine', 'html')

// 静态文件
app.use(require('compression')())
app.use(express.static(path.join(__dirname, 'public')))


// body解析中间件
app.use(require('body-parser').json({
  strict: true, limit: '128mb'
}))

// 会话中间件
const session = require('express-session')
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*10 //过期时间设置(单位毫秒)
  }
}))

// 身份认证
app.use((req, res, next) => {
  //rm
  console.log('--------', req.path, req.body)
  if (req.path === '/sign_in' || req.path == '/login') {
    return next()
  }
  if (req.session.user) {
    return next()
  }
  res.render('login')
})


app.use(require('./router'))

// not found
app.use((req, res, next) => {
  res.status(404).send('API path error，请联系管理员')
})

// error processor
app.use((err, req, res, next) => {
  res.status(500).send('后端服务异常，请联系管理员, error:' + err)
})

app.listen(3001)
console.log('app listen on 3001')


