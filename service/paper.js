const conn = require('../db')
const _ = require('lodash')

module.exports = {
  addPaper(paper, callback) {
    var doc = _.pick(paper, ['title', 'desc', 'operator'])
    doc.created_time = doc.modified_time = new Date().getTime()
    var sql = 'insert into paper(title, `desc`, operator, created_time, modified_time) values(?, ?, ?, ?, ?)';
    conn.query(sql, _.values(doc), function(err, result) {
      console.log('addPaper >>> error:', err, 'result:',result)
      callback(err, result)
    })
  },

  listPaper(callback) {
    var sql = 'select * from paper';
    conn.query(sql, function(err, result) {
      console.log('listPaper >>> error:', err, 'result:',result)
      callback(err, result)
    })
  },

  getPaper(id, callback) {
    var sql = 'select * from paper where id=?'
    conn.query(sql, [id], function(err, result) {
      console.log('getPaper >>> error:', err, 'result:',result)
      callback(err, result)
    })
  },

  updatePaper(paper, callback) {
    var doc = _.pick(paper, ['title', 'desc', 'operator'])
    doc.modified_time = new Date().getTime()
    var sql = 'update paper set title=?, `desc`=?, operator=?, modified_time=? where id=?';
    conn.query(sql, _.values(doc).concat(paper.id), function(err, result) {
      console.log('updatePaper >>> error:', err, 'result:',result)
      callback(err, result)
    })
  },

  deletePaper(id, callback) {
    var sql = 'delete from paper where id=?'
    conn.query(sql, id, function(err, result) {
      console.log('deletePaper >>> error:', err, 'result:',result)
      callback(err, result)
    })
  },
}