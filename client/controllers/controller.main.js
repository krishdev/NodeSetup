var Account = require("../models/model.account");
//var Universities = require("../models/model.univ");
var passport = require("passport");
var nodemailer = require("nodemailer");
var ContentData = require("../models/model.myContent");
var Contact = require("../models/model.contact");

var registerUser = function (req, res) {
	console.log(req.body);
	Account.register(new Account({
			username: req.body.username
		}),
		req.body.password,
		function (err, account) {
			if (err) {
				//console.log(err);
				return res.status(500).json({
					err: err
				});
			}
			console.log("inside registration")
			passport.authenticate('local')(req, res, function () {
				return res.status(200).json({
					status: 'Registration Successful'
				});
			});
		});
};



var loginUser = function (req, res, next) {
	/* Users.findOne({
	         email: req.body.register.email,
	         password: req.body.register.password
	     },
	     function (err, data) {
	         if (err)
	             console.log("Error! user does not exist");
	         else {
	             console.log(data);
	             return res.send(data);
	         }
	     });*/
	function failedAuth(error, user, info) {
		if (error) {
			return next(error);
		}
		if (!user) {
			return res.status(401).json({
				err: info
			});
		}
		req.logIn(user, function (err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not login user'
				});
			}
			res.status(200).json({
				status: user
			});
		});
	}
	passport.authenticate("local", failedAuth)(req, res, next);
};

var logout = function (req, res) {
	req.logout();
	res.status(200).json({
		status: false
	});
};

var insertContent = function (req, res) {
	var content = new ContentData(req.query);
	content.save(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};



var getOneContent = function (req, res) {
	console.log(new RegExp(["^", req.query.itemId, "$"].join(""), "i"));
	ContentData.findOne({
		itemId: new RegExp(["^", req.query.itemId, "$"].join(""), "i"),
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
}

var getAllData = function (req, res) {
	ContentData.find(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};


var updateContent = function (req, res) {
	console.log(req.body._id);
	var query = {
		_id: req.body._id
	};
	ContentData.update(query, req.body, {
		multi: true
	}, function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	});
};

var contact = function (req, res) {
	var contact = new Contact(req.query);
	contact.save(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};
var getMessages = function (req, res) {
	
	Contact.find(function (err, data) {
		if (err)
			return res.send(err);
		return res.send(data);
	})
};


//flicker api



exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logout = logout;

exports.insertContent = insertContent;
exports.getOneContent = getOneContent;
exports.getAllData = getAllData;
exports.updateContent = updateContent;

exports.contact = contact;
exports.getMessages = getMessages;

console.log("controller Initialized");
