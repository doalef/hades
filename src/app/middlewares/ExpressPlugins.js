/**
 * Express plugins and all data additions to req and res.
 **/
import isValid from "./isValid";
import ErrorHandler, { ErrorGenerator } from "./ErrorHandler";
//ADDING REQUEST AND RESPONSE VALIDATORS TO REQUEST
let middlewares = (req, res) => {
	res.validSend = isValid.res;
	res.sendError = ErrorGenerator;
	req.res = res;
	req.errorHandler = ErrorHandler;
	req.validate = isValid.req;
};

export default (req, res, next) => {
	middlewares(req, res);
	next();
};
