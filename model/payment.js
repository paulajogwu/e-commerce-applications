var db = require('../database');

module.exports = {
  

    Submitpayment: function (pay,callback) {
        let sql = "INSERT INTO payments SET  ? ";
        db.query(sql,[pay], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      
    }