const express = require('express')
// 路由
const router = express.Router()

const moment = require('moment')
const paper = require('./service/paper')
const question = require('./service/question')

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
  res.render('questions', {data: req.query})
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
  paper.getPaper(req.query.id, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    if (!result || result.length <= 0) {
      return res.status(200).send({code: -1, message: '获取试卷信息失败'})
    }
    res.render('update_paper', {data: result[0]})
  })
})

// 获取单个题目信息
router.get('/get_question', (req, res, next) => {
  question.getQuestion(req.query.id, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    if (!result || result.length <= 0) {
      return res.status(200).send({code: -1, message: '获取题目信息失败'})
    }
    res.render('update_question', {data: result[0]})
  })
})

// 获取试卷列表数据
router.post('/list_paper', (req, res, next) => {
  paper.listPaper(function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    result.forEach(r => {
      r.created_time = moment(r.created_time).format('YYYY-MM-DD HH:mm:ss')
      r.modified_time = moment(r.modified_time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.status(200).send({code: 0, data: result})
  })
})

// 获取题目列表数据
router.post('/list_question', (req, res, next) => {
  question.listQuestion(req.body.paper_id, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    result.forEach(r => {
      r.created_time = moment(r.created_time).format('YYYY-MM-DD HH:mm:ss')
      r.modified_time = moment(r.modified_time).format('YYYY-MM-DD HH:mm:ss')
    })
    res.status(200).send({code: 0, data: result})
  })
})

// 添加试卷（点击添加按钮）
router.post('/add_paper', (req, res, next) => {
  var doc = req.body
  doc.operator = req.session.user.username
  paper.addPaper(doc, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})

router.get('/add_question', (req, res) => {
  res.render('add_question', {data: req.query})
})

// 添加题目（点击添加按钮）
router.post('/add_question', (req, res, next) => {
  var doc = req.body
  doc.operator = req.session.user.username
  question.addQuestion(doc, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})

router.get('/delete_paper', (req, res) => {
  paper.deletePaper(req.query.id, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})

router.get('/delete_question', (req, res) => {
  question.deleteQuestion(req.query.id, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})


// 更新试卷（点击更新按钮）
router.post('/update_paper', (req, res, next) => {
  var doc = req.body
  doc.operator = req.session.user.username
  paper.updatePaper(doc, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})

// 更新题目（点击更新按钮）
router.post('/update_question', (req, res, next) => {
  var doc = req.body
  doc.operator = req.session.user.username
  question.updateQuestion(doc, function(err, result) {
    if (err) {
      return res.status(200).send({code: -1, message: err.message})
    }
    res.status(200).send({code: 0, data: result})
  })
})

module.exports = router