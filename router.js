const express = require('express')
// 路由
const router = express.Router()

// 登录页面
router.get('/login', (req, res) => {
  res.render('login')
})
// 添加试卷页面
router.get('/add_paper', (req, res) => {
  res.render('add_paper')
})
// 试卷列表页
router.get('/papers', (req, res) => {
  res.render('papers')
})

// 题目列表页
router.get('/questions', (req, res) => {
  res.render('questions')
})

// 试卷预览页
router.get('/preview_paper', (req, res) => {
  res.render('preview_paper', {data: []})
})

// 登录（点击登录按钮）
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

// 获取单个试卷信息
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

// 获取单个题目信息
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

// 获取试卷列表数据
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

// 获取题目列表数据
router.post('/list_question', (req, res, next) => {
  var questions = []
  for(var i=0; i<6; i++) {
    questions.push({
      id: 1001 + i,
      stem: '题干' + i,
      option1: '选项1' + i,
      option2: '选项2' + i,
      option3: '选项3' + i,
      option4: '选项4' + i,
      answer: 'A',
      score: '3',
      created_time: '2017-11-22',
      modified_time: '2017-11-22',
      operator: 'jing',
    })
  }
  res.status(200).send({code: 0, data: questions})
})

// 添加试卷（点击添加按钮）
router.post('/add_paper', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

// 添加题目（点击添加按钮）
router.post('/add_question', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

// 更新试卷（点击更新按钮）
router.post('/update_paper', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

// 更新题目（点击更新按钮）
router.post('/update_question', (req, res, next) => {
  res.status(200).send({code: 0, data: req.body})
})

module.exports = router