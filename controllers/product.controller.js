var db = require('../db.js');

var fs = require('fs');	

var Product = require('../models/product.model.js');

var Account = require('../models/account.model.js');

module.exports.index = function(req,res){

	var page = parseInt(req.query.page) || 1;
	var perPage = 4;
	var start = (page-1)*perPage;
	var end = page*perPage;

	// var totalPage = Math.ceil((db.get('products').size().value())/perPage) || 1;  
	// res.render('products/index.pug',{
	// 	products : db.get('products').value().slice(start,end),
	// 	totalPage : totalPage
	// });

	Product.find({}).then(function(products){

		var totalPage = Math.ceil((products.length)/perPage) || 1;  
		res.render('products/index.pug',{
			products : products.slice(start,end),
			totalPage : totalPage
		});
	});

};

module.exports.search = function(req,res){

	var q = req.query.q;

	Product.find({}).then(function(datas)
	{
		var matchedProducts = datas.filter(function(product)
		{
			return product.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
		});

		res.render('products/index.pug',{
				// user : user,
			products : matchedProducts,
			key : q
		});

	});

	// else{
	// 	res.render('products/index.pug',{
	// 		errors: [
	// 			'Require enter the search word.'
	// 		]
	// 	});
	// 	return;
	// }

};

module.exports.getid = function(req,res){

	var ObjectId = (require('mongoose').Types.ObjectId);

	Product.find({_id:new ObjectId(req.params.id)}).then(function(data){

		res.render('products/detailProduct.pug',{

			product:data[0]

		});

	});

}

module.exports.createProduct = function (req,res){

	res.render('products/create.pug');
	
};

module.exports.postProduct = function(req,res){

	var item;

	if(req.file){

		item = {
			name : req.body.name,
			price : req.body.price,
			content : req.body.content,
			image : req.file.filename
		}

	}
	else
	{
		item = {
			name : req.body.name,
			price : req.body.price,
			content : req.body.content,
			image : ""
		}
	}

	var product = new Product(item);

	product.save();

	res.redirect('/products/edit');

};

module.exports.listEdit = function (req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data1){
		if(data1.length > 0){
			user = data1[0].email;
		}
		
		Product.find({}).then(function(data){

			//console.log(data);
			res.render('products/listEdit.pug',{
				data:data,
				user : user
			});
		});
	});

};

module.exports.listDelete = function (req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data1){
		if(data1.length > 0){
			user = data1[0].email;
		}
		
		Product.find({}).then(function(data){

			res.render('products/listDelete.pug',{
				data:data,
				user : user
			});
		});
	});
	
};


module.exports.edit = function (req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	Product.find({_id:new ObjectId(req.params.id)}).then(function(data){
		//console.log(data);
		res.render('products/edit.pug',{			
			detailProduct : data[0]
		});
		
	});
};

module.exports.editProduct = function(req,res){
	var ObjectId = (require('mongoose').Types.ObjectId);

	var productEdit;

	if(req.file&&req.body.name!=""&&req.body.price!="")
	{
		
		// req.body.image = req.file.filename;

		productEdit = {
			name : req.body.name,
			price : req.body.price,
			content : req.body.content,
			image : req.file.filename
		}
		Product.find({_id:new ObjectId(req.body.productId)}).then(function(data){
			//console.log(data);
			fs.unlink('./public/images/'+data[0].image,function(err){});
		});
	}
	else
	{
		productEdit = {
			name : req.body.name,
			price : req.body.price,
			content : req.body.content
		}
	}

	Product.findOneAndUpdate({_id:new ObjectId(req.body.productId)},productEdit).then(function(data){
		res.redirect('/products/edit');
	});
};

module.exports.listDelete = function(req,res){

	var ObjectId = (require('mongoose').Types.ObjectId);

	var user = ''; 

	Account.find({_id:new ObjectId(req.signedCookies.userId)}).then(function(data1){
		if(data1.length > 0){
			user = data1[0].email;
		}
		
		Product.find({}).then(function(data){

			//console.log(data);
			res.render('products/listDelete.pug',{
				data:data,
				user : user
			});
		});
	});

}

module.exports.deleteProduct = function(req,res){

	var ObjectId = (require('mongoose').Types.ObjectId);

	Product.findOneAndRemove({_id:new ObjectId(req.params.id)}).then(function(data){

		fs.unlink('./public/images/'+data.image,function(err){});

		res.redirect('/products/delete');
		
	});

}