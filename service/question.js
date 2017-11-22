const conn = require('../db')
const _ = require('lodash')

module.exports = {
  addQuestion(question, callback) {
    var doc = _.pick(question, ['stem', 'option1', 'option2', 'option3', 'option4', 'answer', 'score', 'operator', 'paper_id'])
    doc.created_time = doc.modified_time = new Date().getTime()
    var sql = 'insert into question(stem, option1, option2, ' +
      'option3, option4, answer, score, operator, paper_id, created_time, modified_time) ' +
      'values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conn.query(sql, _.values(doc), function(err, result) {
      console.log('error:', err, 'result:',result)
      callback(err, result)
    })
  },

  listQuestion(paper_id, callback) {
    var sql = 'select * from question where paper_id=?';
    conn.query(sql, paper_id, function(err, result) {
      console.log('error:', err, 'result:',result)
      callback(err, result)
    })
  },

  getQuestion(id, callback) {
    var sql = 'select * from question where id=?'
    conn.query(sql, [id], function(err, result) {
      console.log('error:', err, 'result:',result)
      callback(err, result)
    })
  },

  updateQuestion(question, callback) {
    var doc = _.pick(question, ['stem', 'option1', 'option2',
      'option3', 'option4', 'answer', 'score', 'operator', 'paper_id'])
    doc.modified_time = new Date().getTime()
    var sql = 'update question set stem=?, option1=?, option2=?, ' +
      'option3=?, option4=?, answer=?, score=?, operator=?, paper_id=?, modified_time=? where id=?';
    conn.query(sql, _.values(doc).concat(question.id), function(err, result) {
      console.log('error:', err, 'result:',result)
      callback(err, result)
    })
  }
}