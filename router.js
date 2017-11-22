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

router.post('/list_paper', (req, res, next) => {
  var papers = []

  for(var i=0; i<6; i++) {
    papers.push({
      id: 1001 + i,
      title: '荟医教育入学测试' + i,
      desc: '此试卷xxx' + i,
      created_time: '2017-11-22',
      modified_time: '2017-11-22',
      operator: 'jing',
    })
  }
  res.status(200).send({code: 0, data: papers})
})

router.post('/add_paper', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

router.post('/add_question', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

router.post('/update_paper', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

router.post('/update_question', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})


router.get('/get_paper', (req, res, next) => {
  var paper = {
    id: 1001,
    title: '荟医教育入学测试',
    desc: '此试卷xxx',
    created_time: '2017-11-22',
    modified_time: '2017-11-22',
    operator: 'jing',
  }
  res.render('update_paper', {type: 'paper', data: paper})
})

router.get('/get_question', (req, res, next) => {
  var question = {
    id: 1001,
    stem: '题干',
    option1: '选项1',
    option2: '选项2',
    option3: '选项3',
    option4: '选项4',
    answer: '正确答案',
    score: '分值',
    created_time: '2017-11-22',
    modified_time: '2017-11-22',
    operator: 'jing',
  }
  res.render('update_paper', {type: 'question', data: question})
})

module.exports = router