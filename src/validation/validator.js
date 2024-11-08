const joi = require("joi");
const { joiPassword } = require('joi-password');

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = joi.object({
    name: joi.string().alphanum().min(3).max(25).trim(true).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`
    }),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim(true).required().messages({
        'string.base': `"Email" should be a type of 'text'`,
        'string.empty': `"Email" cannot be an empty field`,
        'any.required': `"Email" is a required field`
    }),
    password:joiPassword.string().min(8).max(12).minOfSpecialCharacters(1).minOfLowercase(1).minOfUppercase(1).minOfNumeric(1).noWhiteSpaces().required().messages({
        'string.min': `"password" should have a minimum length of {#limit}`,
        'string.max': `"password" should have a maximum length of {#limit}`,
        'password.minOfUppercase': `"password" should contain at least 1 uppercase character`,
        'password.minOfLowercase' : `"password" should contain at least 1 lowercase character`,
        'password.minOfSpecialCharacters' : `"password" should contain at least 1 special character`,
        'password.minOfNumeric' : `"password" should contain at least 1 numeric character`,
        'password.noWhiteSpaces': `"password" should not conatain white spaces`
    }),
    phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required().messages({
        'string.base': `"phone" number should be a type of 'text'`,
        'string.empty': `"phone" number cannot be an empty field`,
        'string.min': `"phone" number should have a minimum length of {#limit}`,
        'string.pattern':`"phone" number connont not matches the pattern`,
        'any.required': `"phone" number is a required field`
    }),
    city: joi.string().min(3).max(20).trim(true).required().messages({
        'string.base': `"city" should be a type of 'text'`,
        'string.empty': `"city" cannot be an empty field`,
        'string.min': `"city" should have a minimum length of {#limit}`,
        'any.required': `"city" is a required field`
    }),
});

exports.validateSignup = validator(signupSchema);

