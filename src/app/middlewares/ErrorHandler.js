import ERRORS from "../../globals/Errors";
import _ from "lodash";
import errorParser from "mongoose-error-parser";

export function ErrorGenerator(fields = {}, error, req) {
	var res = this;
	let payload = fields ? fields : {};
	if (ERRORS[error]) Object.assign(payload, ERRORS[error]);
	if (!payload["status"]) payload["status"] = 500;
	res.validSend(payload.status, { error: payload });
}

export default function(fieldName, error) {
	var req = this;
	var res = this.res;
	let payload = {};
	if (ERRORS[fieldName]) Object.assign(payload, ERRORS[fieldName]);
	else Object.assign(payload, ERRORS["general-003"]);

	if (error) {
		if (error.errors || error.name == "MongoError") {
			error = errorParser(error);
			error = {
				fields: error.fields,
				messages: error.errors.map(item => item.message)
			};
		} else {
			error = error.message;
		}
		if (process.env.projectMode !== "Production") payload["error"] = error;
	}
	res.validSend(payload.status, { error: payload });
}
