const Joi = require("joi");

module.exports = Joi.object({
  query: Joi.string().required(),
  fromDay: Joi.string().allow(""),
  fromMonth: Joi.string().allow(""),
  fromYear: Joi.string().allow(""),
  toDay: Joi.string().allow(""),
  toMonth: Joi.string().allow(""),
  toYear: Joi.string().allow(""),
  langs: Joi.array(),
});
