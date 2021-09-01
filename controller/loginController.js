const login = require("../model/loginModel");

module.exports = {
   
  UserLogin: function (req, res, next) {
    console.log("good");
    var user;
    var email = req.body.Email;
    var password = req.body.Password;
    if (email == 0) {
      res.redirect("/admin");
    } else if (password == 0 || password < 8) {
      res.redirect("/admin");
    } else {
      login.loginUser(email, password, function (data) {
        let user_id = data[0].id;
        let fname = data[0].first_name;
        let lname = data[0].last_name;
        console.log("user_id",user_id)
        if (data == 0) {
          res.redirect("/register");
        } else {
          //var user =(req.session.data);
          req.session.user_id = user_id
          req.session.fname = fname
          req.session.lname = lname

          res.redirect("/");
        }
      }).catch();
    }
  },

  AdminLogin: function (req, res, next) {
    var email = req.body.Email;
    var password = req.body.Password;
    if (email == 0) {
      return res.render();
    } else if (password == 0 ) {
      return res.render();
    } else {
      login.LoginAdmin(email, password, function (err) {
        let user_id = data[0].id;
        let fname = data[0].firstName;
        let lname = data[0].lastName;
        let role = data[0].role;
        if (data == 0) {
          res.redirect("/register");
        } else if(role != 'admin'){
          res.redirect("/")
        }
         else {
          req.session.user_id = user_id
          req.session.fname = fname
          req.session.lname = lname

          res.redirect("/admin");
        }
      });
    }
  },

  isLoggedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.oldUrl = req.url;
    res.redirect("/user/signin");
  },
};
