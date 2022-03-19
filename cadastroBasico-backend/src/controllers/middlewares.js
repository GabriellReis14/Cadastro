require("dotenv/config");
const jwt = require("jsonwebtoken");
const JWT_PASS = process.env.CHAVE_JWT;
const helper = require("../helper");


module.exports = class Middlewares {
	constructor() { }

	decode(req, res, next) {
		try {
			let token = req.headers["x-access-token"];

			if (!token) {
				res.status(401).send(helper.retornoPadrao(false,"Token não informado"));
				return
			};
		
			let decoded =  jwt.verify(token, JWT_PASS);
		
			req.decoded = decoded;

			next();
		} catch (error) {
			res.status(error.status ? error.status : 500).json(error.message ? error.message : "Ocorreu um erro");
		}
	}
};
