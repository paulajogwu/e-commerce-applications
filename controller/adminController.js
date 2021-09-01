const adminModel = require("../model/adminModel");
const userModel = require("../model/customerModel");
var path = require("path");
var formidable = require("formidable");
var fs = require("fs");
const Cart = require("../model/cartModel");
const excel = require("exceljs");

module.exports = {
  addAdmin: function (req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;

    //var date = new Date();

    var admin_detail = { firstName, lastName, email, role, password };

    adminModel.subCustomer(admin_detail, function (data) {
      res.redirect("/");
    });
  },
  addproduct: function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      var oldpath = files.upload.path;
      var newpaths = "./public/uploads/" + files.upload.name;
      var newpath = "../uploads/" + files.upload.name;

      fs.rename(oldpath, newpaths, function (err) {
        //if (err) throw err;
      });

      var title = fields.title;
      var category = fields.category;
      var currency = fields.currency;
      var description = fields.description;
      var price = fields.price;
      var quantity = fields.quantity;
      var d = new Date().toDateString();
      //console.log(title,currency)

      if (title == "") {
        return res.redirect("/");
      } else if (newpath == "") {
        return res.redirect("/");
      } else if (category == "") {
        return res.redirect("/");
      } else if (currency == "") {
        return res.redirect("/");
      } else if (description == "") {
        //|| description < 15
        return res.redirect("/");
      } else if (price == "" || price < 0) {
        return res.redirect("/");
      } else if (price == "" || price < 0) {
        return res.redirect("/");
      } else if (newpath < 0) {
        return res.redirect("/");
      } else {
        adminModel.insertproduct(
          title,
          category,
          currency,
          quantity,
          price,
          description,
          newpath,
          d,
          function (data) {
            res.redirect("/admin");
          }
        );
      }
    });
  },
  CategoryAdd: function (req, res) {
    var inputData = req.body.name_c;
    if (inputData == 0) {
      return res.redirect("/");
    } else {
      adminModel.categoryCheck(inputData, function (data) {
        var name = JSON.stringify(data);
        console.log("same", name);
        if (inputData == name) {
          return res.redirect("/");
        } else {
          adminModel.addCategory(inputData, function (data) {
            res.redirect("/admin");
          });
        }
      });
    }
  },

  categoryForm: function (req, res) {
    adminModel.categoryz(function (datac) {
      res.render("admin/addproduct", { layout: "admin", cat: datac });
    });
  },

  productView: function (req, res) {
    adminModel.productlist(function (data) {
      res.render("admin/productView", { layout: "admin", products: data });
    });
  },

  selectUpdate: function (req, res) {
    var id = req.param("id");
    adminModel.productById(id, function (data) {
      adminModel.categoryz(function (datac) {
        console.log({ cat: datac });
        res.render("admin/productUpdate", {
          layout: "admin",
          products: data,
          cat: datac,
        });
      });
    });
  },

  updateproduct: function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
      var oldpath = files.upload.path;
      var newpaths = "./public/uploads/" + files.upload.name;
      var newpath = "../uploads/" + files.upload.name;

      fs.rename(oldpath, newpaths, function (err) {
        if (err) throw err;
      });

      var title = fields.title;
      var category = fields.category;
      var currency = fields.currency;
      var description = fields.description;
      var price = fields.price;
      var quantity = fields.quantity;
      var d = new Date().toDateString();

      if (title == 0) {
        return res.render();
      } else if (category == 0) {
        return res.render();
      } else if (currency == 0) {
        return res.render();
      } else if (description == 0 || description < 15) {
        return res.render();
      } else if (price == 0 || price > 0) {
        return res.render();
      } else if (price == 0 || price > 0) {
        return res.render();
      } else if (newpath > 0) {
        return res.render();
      } else {
        adminModel.insertproduct(
          title,
          category,
          currency,
          quantity,
          price,
          description,
          newpath,
          d,
          function (data) {
            res.redirect("/");
          }
        );
      }
    });
  },

  OrderView: function (req, res) {
    adminModel.orders(function (data) {
      //var id = data[0].user_id
      //  userModel.getUserById(id,function (datac){
      //  var first_name = datac[0].first_name
      //  var last_name = datac[0].last_name
      // console.log(first_name,last_name,id)
      //var user =(datac)
      //  data.append(first_name)
      //  data.append(last_name)
      //    console.log(data)

      //  })
      //console.log(data)
      res.render("admin/orderDetail", { layout: "admin", products: data });
    });
  },

  UserPaymentView: function (req, res) {
    adminModel.productlist(function (data) {
      res.send(data);
    });
  },

  PaymentView: function (req, res) {
    adminModel.payments(function (data) {
      res.render("admin/payments", { layout: "admin", products: data });
    });
  },

  OrderItemView: function (req, res) {
    var id = req.param("id");
    console.log("Id", id);
    adminModel.orderItem(id, function (data) {
      var cart = new Cart(JSON.parse(data[0].cart));
      var date = data[0].date;
      var userId = data[0].user_id;
      adminModel.ordersUserId(userId, function (datac) {
        return res.render("admin/userOrder", {
          layout: "admin",
          products: cart.generateArray(),
          totalPrice: cart.totalPrice,
          user: datac,
          date,
        });
      });
    });
  },

  UserPaymentView: function (req, res) {
    var Id = req.param("id");
    adminModel.paymentByUser(Id, function (datac) {
      var id = datac[0].user_id;
      userModel.getUserBy(id, function (data) {
        console.log("pay", data);
        res.render("admin/userPaymentDetails", {
          layout: "admin",
          user: data,
          payments: datac,
        });
      });
    });
  },

  exportOrders: function (req, res) {
    adminModel.orders(function (data) {
      console.log("pay=========", data);
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Customer_Orders");

      worksheet.columns = [
        { header: "First Name", key: "first_name", width: 25 },
        { header: "Last Name", key: "last_name", width: 25 },
        { header: "Phone", key: "phone", width: 25 },
        { header: "E-mail", key: "email", width: 25 },
        { header: "Address", key: "address", width: 25 },
        { header: "Total Price", key: "Amount", width: 25 },
        { header: "Data", key: "date", width: 25 },
      ];
      worksheet.addRows(data);
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment; filename="+"orders.xlsx"
      //   );
      return workbook.xlsx.writeFile("orders.xlsx").then(function () {
        res.status(200).end();
      });
    });
  },

  exportCustomerOrders: function (req, res) {
    adminModel.orders(function (data) {
      console.log("pay=========", data);
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Customer_Orders");

      worksheet.columns = [
        { header: "First Name", key: "first_name", width: 25 },
        { header: "Last Name", key: "last_name", width: 25 },
        { header: "Phone", key: "phone", width: 25 },
        { header: "E-mail", key: "email", width: 25 },
        { header: "Address", key: "address", width: 25 },
        { header: "Total Price", key: "Amount", width: 25 },
        { header: "Data", key: "date", width: 25 },
      ];
      worksheet.addRows(data);
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment; filename="+"orders.xlsx"
      //   );
      return workbook.xlsx.writeFile("orders.xlsx").then(function () {
        res.status(200).end();
      });
    });
  },

  exportPayments: function (req, res) {
    adminModel.orders(function (data) {
      console.log("pay=========", data);
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Customer_Orders");

      worksheet.columns = [
        { header: "First Name", key: "first_name", width: 25 },
        { header: "Last Name", key: "last_name", width: 25 },
        { header: "Phone", key: "phone", width: 25 },
        { header: "E-mail", key: "email", width: 25 },
        { header: "Address", key: "address", width: 25 },
        { header: "Total Price", key: "Amount", width: 25 },
        { header: "Data", key: "date", width: 25 },
      ];
      worksheet.addRows(data);
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment; filename="+"orders.xlsx"
      //   );
      return workbook.xlsx.writeFile("orders.xlsx").then(function () {
        res.status(200).end();
      });
    });
  },

  exportCustomers: function (req, res) {
    adminModel.orders(function (data) {
      console.log("pay=========", data);
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Customer_Orders");

      worksheet.columns = [
        { header: "First Name", key: "first_name", width: 25 },
        { header: "Last Name", key: "last_name", width: 25 },
        { header: "Phone", key: "phone", width: 25 },
        { header: "E-mail", key: "email", width: 25 },
        { header: "Address", key: "address", width: 25 },
        { header: "Total Price", key: "Amount", width: 25 },
        { header: "Data", key: "date", width: 25 },
      ];
      worksheet.addRows(data);
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment; filename="+"orders.xlsx"
      //   );
      return workbook.xlsx.writeFile("orders.xlsx").then(function () {
        res.status(200).end();
      });
    });
  },

  exportProduct: function (req, res) {
    adminModel.orders(function (data) {
      console.log("pay=========", data);
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Customer_Orders");

      worksheet.columns = [
        { header: "First Name", key: "first_name", width: 25 },
        { header: "Last Name", key: "last_name", width: 25 },
        { header: "Phone", key: "phone", width: 25 },
        { header: "E-mail", key: "email", width: 25 },
        { header: "Address", key: "address", width: 25 },
        { header: "Total Price", key: "Amount", width: 25 },
        { header: "Data", key: "date", width: 25 },
      ];
      worksheet.addRows(data);
      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      //   res.setHeader(
      //     "Content-Disposition",
      //     "attachment; filename="+"orders.xlsx"
      //   );
      return workbook.xlsx.writeFile("orders.xlsx").then(function () {
        res.status(200).end();
      });
    });
  },
};
