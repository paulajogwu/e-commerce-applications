var db = require('../database');


module.exports = {
  addCategory: function (inputData, callback) {
    var sql = "INSERT INTO `category` (name_c)VALUES('"+ inputData+"')";
    db.query(sql,  function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  categoryCheck: function (inputData, callback) {
    var sql = `SELECT name_c FROM category WHERE name_c='${inputData}'`;
    db.query(sql,  function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },

  categoryz: function (callback) {
    var sql = 'SELECT * FROM category ';
    db.query(sql, function (err, datac) {
      if (err) throw err;
      return callback(datac);
    });
  },

  productlist: function (callback) {
    var sql = 'SELECT * FROM products ORDER BY id DESC ';
    db.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data);
    });
  },


  productById: function (id, callback) {
    var sql = `SELECT * FROM products WHERE id='${id}' `;
    db.query(sql, function (err, data) {

      if (err) throw err;
      return callback(data);
    });
  },

  insertproduct: function (title, category, currency, quantity, price, description, newpath, d, callback) {
    console.log(title,price)
    var sql = "INSERT INTO `products` (name,category,currency, qty, price, description,image,date) VALUES('" + title + "', '" + category + "', '" + currency + "', '" + quantity + "', '" + price + "', '" + description + "' , '" + newpath + "', '" + d + "')";
    db.query(sql, function (err, data) {
      if (err) throw err;
      return callback(data);

    })
  },


  payments: function (callback) {
    var sql = 'SELECT * FROM payments ';
    db.query(sql, function (err, datac) {
      if (err) throw err;
      return callback(datac);
    });
  },

  orders: function (callback) {
    var sql =
 "SELECT orderdetails.id, user.first_name, user.last_name,user.email, user.phone,orderdetails.state,orderdetails.address,orderdetails.Amount,orderdetails.payment_id,orderdetails.user_id, orderdetails.date FROM orderdetails INNER JOIN user ON orderdetails.user_id=user.id ";
    db.query(sql, function (err, datac) {
      if (err) throw err;
      return callback(datac);
    });
  },


  
  orderItem: function (id, callback) {
    var sql = `SELECT * FROM orderdetails WHERE id='${id}' `;
    db.query(sql, function (err, data) {

      if (err) throw err;
      return callback(data);
    });
  },


  ordersUserId: function (userId, callback) {
    var sql =
 `SELECT * FROM user WHERE id= '${userId}' `;
    db.query(sql, function (err, datac) {
      if (err) throw err;
      return callback(datac);
    });
  },


  paymentByUser: function (Id,callback) {
    var sql = `SELECT * FROM payments WHERE id=${Id}`;
    db.query(sql, function (err, datac) {
      if (err) throw err;
      return callback(datac);
    });
  },

  saveAdmin: function (admin_details, callback) {
    var sql = "INSERT INTO admin  SET ?";
    db.query(sql, function (err, data) {
        if (err) throw err;
        return callback(data);

    })


},
}

//var sql = `SELECT payments.id, user.first_name, user.last_name,user.email, user.phone, payments.CardName, payments.CardNumber, payments.ExpiryDate ,payments.Amount FROM payments INNER JOIN user ON payments.user_id=user.id  WHERE user_id=${userId}`;