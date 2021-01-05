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

var Trendingcake = require('./models/trendingcake.model.js');

var app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

var port = 3000;

app.get('/',function(req,res){

	var arrayTrending = [];

	var arraySalecake = [];

	Product.find({}).then(function(data){

		Trendingcake.find({}).then(function(data1){

			for(var i=0;i<data1.length;i++){

				for(var j=0;j<data.length;j++) {

					if(data1[i].product_id == data[j]._id){

						arrayTrending.push(data[j]);
					}
				}
					
			}

		});

		Salecake.find({}).then(function(data2){

			for(var k=0;k<data2.length;k++){

				for(var l=0;l<data.length;l++) {

					if(data2[k].product_id == data[l]._id){

						arraySalecake.push(data[l]);
					}
				}

			}

			res.render('index.pug',{
				products:data,
				trendingcake:arrayTrending,
				salecakes:arraySalecake
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

app.use('/products',authMiddleware.requireAuth,productRoute)

//app.use('/products',productRoute);

app.listen(port,function(){
	console.log('Server listening on port ' + port);
	console.log('Link : http://localhost:3000/');
});