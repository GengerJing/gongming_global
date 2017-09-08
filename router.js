const express = require('express')
// 路由
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/add_paper', (req, res) => {
  res.render('add_paper')
})

router.get('/papers', (req, res) => {
  res.render('papers')
})

router.get('/paper', (req, res) => {
  res.render('paper')
})

router.post('/sign_in', (req, res, next) => {
  var mock_user = {
    username: 'jing',
    password: '123',
  }
  var user = req.body

  if (user.username === mock_user.username
    && user.password === mock_user.password) {
    req.session.user = user
    return res.status(200).send({code: 0, message: '用户登录成功'})
  }
  return res.status(401).send({code: -1, message: '用户登录失败'})
})

router.post('/add_notice', (req, res, next) => {
  res.status(200).send('success add notice')
})

module.exports = router