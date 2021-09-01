var db = require('../database');

module.exports = {


  findById: function (id,callback) {
        var sql = 'SELECT * FROM products WHERE id = ?';
        db.query(sql,id, function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },

    index: function (callback) {
        var sql = 'SELECT * FROM products ORDER BY id DESC ';
        db.query(sql, function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },

      
    ads: function (callback) {
        var sql = 'SELECT * FROM products ORDER BY id DESC ';
        db.query(sql, function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
    

                         ////BY CATEGORIES

                         
    Electronics: function (callback) {
      var category = 'electronics'
        var sql = 'SELECT * FROM products WHERE category =?  ORDER BY id DESC ';
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },

      
    Cloths: function (callback) {
      var category = 'cloth'
        var sql = 'SELECT * FROM products WHERE category = ? ORDER BY id DESC ';
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },

      
    Food: function (callback) {
      var category = 'food'
        var sql = 'SELECT * FROM products WHERE category = ? ORDER BY id DESC ';
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
      
    Beauty: function (callback) {
      var category = 'beauty'
        var sql = 'SELECT * FROM products WHERE category = ? ORDER BY id DESC ';
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },
    Sports: function(callback) {
      var category = 'sports'
        var sql = "SELECT * FROM products  WHERE category = ? ORDER BY id DESC";//WHERE category = sports
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },


      
    Laptop: function (callback) {
      var category = 'laptop'
        var sql = 'SELECT * FROM products WHERE category = ? ORDER BY id DESC ';
        db.query(sql,[category], function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },

      
    Phones: function (callback) {
      var category = 'phone'
        var sql = 'SELECT * FROM products WHERE category = ? ORDER BY id DESC ';
        db.query(sql, [category],function (err, data) {
          if (err) throw err;
          return callback(data);
        });
      },


      topSix: function (callback) {
          var sql = 'SELECT * FROM products  ORDER BY id DESC Limit 6';
          db.query(sql, function (err, data) {
            if (err) throw err;
            return callback(data);
          });
        },

        toptwelve1: function (callback) {
            var sql = 'SELECT * FROM products  ORDER BY id DESC Limit 4 ';
            db.query(sql, function (err, datat1) {
              if (err) throw err;
              return callback(datat1);
            });
          },
          toptwelve2: function (callback) {
            var sql = 'SELECT * FROM products  ORDER BY id ASC Limit 4 ';
            db.query(sql, function (err, datat2) {
              if (err) throw err;
              return callback(datat2);
            });
          },
          toptwelve3: function (callback) {
            var sql = 'SELECT * FROM products  ORDER BY category DESC Limit 4 ';
            db.query(sql, function (err, datat3) {
              if (err) throw err;
              return callback(datat3);
            });
          },
          toptwelve4: function (callback) {
            var sql = 'SELECT * FROM products  ORDER BY category DESC Limit 3 ';
            db.query(sql, function (err, datat4) {
              if (err) throw err;
              return callback(datat4);
            });
          },

          searchModel: function (name,callback) {
            var sql = "SELECT * FROM products WHERE name REGEXP ? ";
            db.query(sql,[name], function (err, datac) {
              if (err) throw err;
              return callback(datac);
            });
          }
}