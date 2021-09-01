var express = require('express')
var session = require('express-session');
var router = express.Router();


var adminCon = require('../controller/adminController') 
var productCon = require('../controller/productController') 
var customerCon = require('../controller/customerController') 
var loginCon = require('../controller/loginController') 

router.get('/', productCon.Index);



//// ADMIN ROUTINGS
router.get('/admin', function (req, res, next) {
    res.redirect('/addproduct')
});

router.get('/ViewPayment', adminCon.PaymentView);
router.get('/ViewOrder', adminCon.OrderView);
router.get('/ViewOrderedItem', adminCon.OrderItemView);//
router.get('/UserPaymentView', adminCon.UserPaymentView);

router.get('/exportOrder', adminCon.exportOrders);




router.get('/addproduct', adminCon.categoryForm);
router.get('/Updateproduct', adminCon.selectUpdate);

router.post('/submitproduct', adminCon.addproduct);

router.post('/submitCategory', adminCon.CategoryAdd);

router.get('/category', function (req, res, next) {
    res.render('admin/productCategory', {layout:'admin'})
});
router.get('/ads', function (req, res, next) {
    res.render('admin/ads', {layout:'admin'})
});
router.get('/catshow', function (req, res, next) {
    res.render('products/carts', {layout:'index'})
});




//// PRODUCT ROUTINGS
router.get('/productview', adminCon.productView);
router.get('/show-cart', productCon.showcart); 
router.get('/add-to-cart/:id', productCon.addtocart);
router.get('/reduce/:id', productCon.reduce);
router.get('/increase/:id', productCon.increase);
router.get('/remove/:id', productCon.remove);
router.get('/shopping-cart', productCon.showcart);

router.post('/search', productCon.Search);

router.post('/order', productCon.order);
router.post('/address', productCon.address);

router.get('/productdetails', productCon.detail);

router.get('/electronics', productCon.ElectronicView);

router.get('/laptop', productCon.LaptopView);

router.get('/phones', productCon.PhonesView);

router.get('/sports', productCon.SportsView);

router.get('/beauty', productCon.BeautyView);

router.get('/cloths', productCon.ClothsView);

router.get('/food', productCon.FoodView);
router.get('/ads', productCon.AdsView);






////CUSTOMER ROUTINGS
router.get('/register', function (req, res, next) {
    res.render('register', {layout:'index'})
});
router.post('/subcustomer',customerCon.addCustomer );

router.get('/viewcustomer',customerCon.Customer );
router.get('/login', function (req, res, next) {
    //var successMgs = req.flash('success')[0];
    var logins = "1"
    res.render('login', {layout:'index', login:logins})
});
router.post('/signin',loginCon.UserLogin) 
router.post('/signin_admin',loginCon.AdminLogin) 

module.exports = router;