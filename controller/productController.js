const productModel = require("../model/productModel");
const Cart = require("../model/cartModel");
var mail = require("../model/email");
var payment = require("../model/payment");
var order = require("../model/order");
module.exports = {
  addtocart: function (req, res) {
    var id = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = productModel.findById(id, function (data) {
      if (data == null) {
        return res.status(200).json({
          status: true,
          message: 'out of stock',
      });
      }
      //console.log("cart details", data);
      cart.add(data[0], id);
      req.session.cart = cart;
      //console.log(req.session.cart);
      res.status(200).json({
        status: true,
        message: 'Add to Cart successful',
    })
    });
  },
  detail: function (req, res) {
    var id = req.param("id");
    productModel.findById(id, function (data) {
      res.render("products/productdetails", {
        layout: "index",
        products: data,
      });
    });
  },

  reduce: function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
  },

  increase: function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increaseByOne(productId);
    req.session.cart = cart;
    //res.redirect("/shopping-cart");
    res.status(200).json({
      status: true,
      message: 'Add to Cart successful',
  });


  },
  remove: function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
  },

  showcart: function (req, res) {
    if (!req.session.cart) {
      return res.render("products/carts", { products: null });
    }
    var cart = new Cart(req.session.cart);
    return res.render("products/carts", {
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
    });
  },

  checkout: function (req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/shopping-cart");
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash("error")[0];
    return res.render("shop/checkout", {
      total: cart.totalPrice,
      errMsg: errMsg,
      noError: !errMsg,
    });
  },



  Search: function (req, res) {
    var name = req.param("name");
    console.log("name", name)
    productModel.searchModel(name, function (data){
      console.log("search",data)
      res.render("products/search", {
        products:data});
    });
   
    

},

  address: function (req, res, next) {
    var data = [];
    var state = req.body.state;
    var address = req.body.address;
    var detail = { state: state, address: address };
    data.push(detail);
    if (state == "") {
      var options = { position: "t", duration: "500" };
      req.flash(
        "info",
        "The email address you entered was not valid.",
        options
      );
      return res.redirect("/show-cart");
    } else if (address == "") {
      return res.redirect("/");
    } else {
      return res.render("checkout", { layout: null, delivery: data });
    }
  },

  //  router.post('/checkout', isLoggedIn,
  order: function (req, res, next) {
    if (!req.session.cart) {
      return res.redirect("/shopping-cart");
    }
    var cart = JSON.stringify( new Cart(req.session.cart));
    var user_id = req.body.user_id;
    var CardName = req.body.cardName
    var CardNumber = req.body.cardNumber;
    var ExpiryDate = req.body.expiryDate;
    var Amount = req.body.amount;
    var state = req.body.state;
    var address = req.body.address;
    console.log(state,address)
    var pay = {user_id, CardName, CardNumber, ExpiryDate, Amount};
    console.log(pay)

    payment.Submitpayment(pay, function (data) {
      var payment_id = data.insertId
     
      console.log("payId",  payment_id )

      var details = {user_id, cart, state, address,Amount, payment_id};

      order.SubmitOrder(details, function (data) {

        req.flash("success", "Successfully bought product!");
        req.session.cart = null;
        res.redirect("/");
      });
    });

    // var stripe = require("stripe")(
    //     "sk_test_pVJhFSD0tie3QmfWqzusM6ib"
    // );

    // stripe.charges.create({
    //     amount: cart.totalPrice * 100,
    //     currency: "usd",
    //     source: req.body.stripeToken, // obtained with Stripe.js
    //     description: "Test Charge"
    // }, function(err, charge) {
    //     if(err) {
    //         req.flash('error', err.message);
    //         return res.redirect('/checkout');
    //     }
    //     var order = new Order({
    //         user: req.user,
    //         cart: cart,
    //         address: req.body.address,
    //         name: req.body.name,
    //         paymentId: charge.id
    //     });
    //     order.save(function(err, result) {
    //         req.flash('success', 'Successfully bought product!');
    //         req.session.cart = null;
    //         res.redirect('/');
    //     });
    // });
  },

  ElectronicView: function (req, res) {
    productModel.Electronics(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  ClothsView: function (req, res) {
    productModel.Cloths(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  BeautyView: function (req, res) {
    productModel.Beauty(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  SportsView: function (req, res) {
    productModel.Sports(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  PhonesView: function (req, res) {
    productModel.Phones(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  LaptopView: function (req, res) {
    productModel.Laptop(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  FoodView: function (req, res) {
    productModel.Food(function (data) {
      productModel.toptwelve4(function (datat4) {
        res.render("products/product", {
          layout: "index",
          products: data,
          product4: datat4,
        });
      });
    });
  },

  AdsView: function (req, res) {
    productModel.ads(function (data) {
      res.render("products/product", { layout: "index", products: data });
    });
  },

  Index: function (req, res) {
    productModel.toptwelve1(function (datat1) {
      productModel.toptwelve2(function (datat2) {
        productModel.toptwelve3(function (datat3) {
          productModel.toptwelve4(function (datat4) {
            productModel.topSix(function (data) {
              // res.render("products/product", { layout: "index",  });
              var logins = "1";
              res.render("body", {
                layout: "index",
                login: logins,
                products: data,
                product1: datat1,
                product2: datat2,
                product3: datat3,
                product4: datat4,
              });
            });
          });
        });
      });
    });
  },

  // sendmail: function(req,res){
  //     var details = {}
  //     mail.mailTransporter.sendMail(details,function(err){
  //         if(err){
  //             console.log(err)
  //         }else{
  //             console.log('Email sent')
  // req.session.flash = {
  //   type: 'danger',
  //   intro: 'Validation error!',
  //   message: 'The email address you entered was not valid.',
  //   };

  //         }
  //     })
  // }
};




//{"items":{"17":{"item":{"id":17,"name":"Wireless Mouse","category":"laptop","currency":"₦","qty":100,"price":10000,"description":"wireless Mouse Lightening Mouse","image":"../uploads/images (67).jpeg","date":"Sat May 22 2021"},"qty":1,"price":10000}},"totalQty":1,"totalPrice":10000}