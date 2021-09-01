const customerModel = require('../model/customerModel');


module.exports = {

    addCustomer: function (req, res, next) {
        //console.log('title',req.body.first_name)

        var title = req.body.title;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var password = req.body.password;
        var address = req.body.address;
        var city = req.body.city;
        var state = req.body.state;
        var gender = req.body.gender;
        var phone = req.body.phone;
        var date = new Date();

        if (title == 0) {
            return  res.redirect('/');
        }
        else if (first_name == 0) {
            return  res.redirect('/');
        }
        else if (last_name == 0) {
            return  res.redirect('/');
        }
        else if (email == 0) {
            return  res.redirect('/');
        }
        else if (password == 0 || password > 8) {
            return  res.redirect('/');
        }
        else if (address == 0) {
            return  res.redirect('/');
        }
        else if (city == 0) {
            return  res.redirect('/');
        }
        else if (state == 0|| state == 'Select-your-State') {
            return  res.redirect('/');
        }
        else if (gender == 0) {
            return  res.redirect('/');
        }
        else if (phone == 0 || phone < 11) {
            return  res.redirect('/');
        }
        else {
            customerModel.subCustomer(title, first_name, last_name, email, password, address, city, state, gender, phone,date, function (data) {
                var id = data.insertId
                req.session.user_id = id;
                req.session.fname = first_name;
                req.session.lname = last_name;
                res.redirect('/');
            })
        }
    },


    Customer: function (req, res) {
        customerModel.Customerlist(function (data) {
            res.render('admin/customerView', { layout: 'admin', customers: data })
        })
    },

    isLoggedIn:function(req, res, next) { 
        if(req.isAuthenticated()) { 
            return next(); 
        } 
        req.session.oldUrl = req.url; 
        res.redirect('/user/signin'); 
    }

}