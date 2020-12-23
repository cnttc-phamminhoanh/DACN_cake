require('dotenv').config();

var express = require('express');

var cookieParser = require('cookie-parser')

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false});

var authRouter = require('./routes/auth.route.js');

var registerRouter = require('./routes/register.route.js');

var productRoute = require('./routes/product.route.js');

var loggedRouter = require('./routes/logged.route.js');

var logoutRouter = require('./routes/logout.route.js');

var userRoute = require('./routes/user.route.js');

var cartRoute = require('./routes/cart.route.js');

var authMiddleware = require('./middlewares/auth.middleware.js');

var Product = require('./models/product.model.js');

var Contacts = require('./models/contact.model.js');

var Salecake = require('./models/salecake.model.js');

var app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

var port = 3000;

app.get('/',function(req,res){
	Product.find({}).then(function(data){
		Salecake.find({}).then(function(data1){
			res.render('index.pug',{
				products:data,
				salecakes:data1
			});
		})
	});
});

app.post('/contacts',function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	if(name&&email&&message){
		var item = {
				name:name,
				email:email,
				message:message
			};
		var contact = new Contacts(item);
		contact.save();
		res.redirect('/');
	}
});

app.use('/auth',authRouter);

app.use('/users',authMiddleware.requireAuth,userRoute);

app.use('/account',registerRouter);

app.use('/logged',authMiddleware.requireAuth,loggedRouter);

app.use('/logout',logoutRouter);

app.use('/cart',authMiddleware.requireAuth,cartRoute)

app.use('/products',productRoute)

//app.use('/products',productRoute);

app.listen(port,function(){
	console.log('Server listening on port ' + port);
	console.log('Link : http://localhost:3000/');
});