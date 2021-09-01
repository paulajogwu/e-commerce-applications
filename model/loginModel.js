var db = require('../database');

module.exports = {
  

    loginUser: function (email,password,callback) {
        var sql = 'SELECT * FROM user WHERE email = ?  AND Password=? ';
        db.query(sql,[email,password], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      
    LoginAdmin: function (email,password,callback) {
     
        var sql = 'SELECT * FROM admin email = ?  AND Password = ? ';
        db.query(sql,[email,password], function (err, data) {
          console.log(data,"google")
          if (err) throw err;
          return callback(data);
        });
      },
}