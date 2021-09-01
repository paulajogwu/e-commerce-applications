var db = require('../database');

module.exports = {
  

    SubmitOrder: function (details,callback) {
        var sql = "INSERT INTO orderdetails SET  ? ";
        db.query(sql,[details], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      
    }