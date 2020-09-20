module.exports.employee = function(req,res){
	res.render('logged/employee.pug');
};
module.exports.admin = function(req,res){
	res.render('logged/admin.pug');
};
module.exports.customer = function(req,res){
	res.render('logged/customer.pug');
};
