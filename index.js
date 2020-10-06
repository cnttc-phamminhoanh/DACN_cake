require('dotenv').config();

var express = require('express');

var cookieParser = require('cookie-parser')

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var authRouter = require('./routes/auth.route.js');

var registerRouter = require('./routes/register.route.js');

var productRoute = require('./routes/product.route.js');

var loggedRouter = require('./routes/logged.route.js');

var logoutRouter = require('./routes/logout.route.js');

var authMiddleware = require('./middlewares/auth.middleware.js');

var app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

var port = 3000;

app.get('/',function(req,res){
	res.render('index.pug',{
		name : 'Mati 17CNTTC'
	});
});

app.use('/auth',authRouter);

app.use('/account',registerRouter);

app.use('/logged',authMiddleware.requireAuth,loggedRouter);

app.use('/logout',logoutRouter);

//app.use('/products',productRoute);

app.listen(port,function(){
	console.log('Server listening on port ' + port);
	console.log('Link : http://localhost:3000/');
});