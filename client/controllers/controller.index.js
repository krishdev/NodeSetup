var model = require("../models/model.account");
console.log("index - initialized");
exports.getUserDetails = function (req, res) {
	res.render("index", ({
		title: "Index Page"
	}));
}

console.log("index - ended");
