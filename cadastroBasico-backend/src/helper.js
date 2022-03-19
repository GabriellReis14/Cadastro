exports.retornoPadrao = (success = false, message = null) => {
	return {
		success: success,
		message: message
	};
};

exports.retornoLogin = (success = false, message = null, token = null) => {
	return {
		success: success,
		message: message,
		token: token
	};
};
