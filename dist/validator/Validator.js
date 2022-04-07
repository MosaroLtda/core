"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const BadRequestError_1 = require("../errors/http/BadRequestError");
const ValidationError_1 = require("../errors/validator/ValidationError");
const rulesAdapter_1 = __importDefault(require("./rulesAdapter"));
class Validator {
    constructor(validateRules) {
        this.validateRules = validateRules;
        this.verify = (body) => {
            try {
                const attributesToValidate = Object.keys(this.validateRules);
                attributesToValidate.forEach((attributeName) => {
                    const attributeDefinedRule = this.validateRules[attributeName];
                    const rule = rulesAdapter_1.default[attributeDefinedRule.type];
                    if (!rule) {
                        throw new Error(`Invalid type '${attributeDefinedRule.type}' for attribute '${attributeName}'`);
                    }
                    if (attributeDefinedRule.type === 'PERSONALIZED') {
                        rule.handle = attributeDefinedRule.personalizedVerifyFunction;
                    }
                    const attributeValue = body[attributeName];
                    const valueIsEmpty = attributeValue === undefined;
                    const valueIsNull = attributeValue === null;
                    if (!attributeDefinedRule.required && valueIsEmpty)
                        return true;
                    const { requiredMessage, nullableMessage, message, failureMessage } = attributeDefinedRule;
                    if (attributeDefinedRule.required && valueIsEmpty) {
                        if (typeof requiredMessage === 'string' || typeof message === 'string') {
                            throw new ValidationError_1.ValidationError(requiredMessage || message);
                        }
                        throw new ValidationError_1.ValidationError(rule.requiredMessage.replace('%attributeName%', attributeName));
                    }
                    if (!attributeDefinedRule.isNullable && valueIsNull) {
                        if (typeof nullableMessage === 'string' || typeof message === 'string') {
                            throw new ValidationError_1.ValidationError(nullableMessage || message);
                        }
                        throw new ValidationError_1.ValidationError(rule.nullableMessage.replace('%attributeName%', attributeName));
                    }
                    const attributeIsValid = rule.handle(attributeValue);
                    if (!attributeIsValid) {
                        if (typeof failureMessage === 'string' || typeof message === 'string') {
                            throw new ValidationError_1.ValidationError(failureMessage || message);
                        }
                        throw new ValidationError_1.ValidationError(rule.failureMessage.replace('%attributeName%', attributeName));
                    }
                });
                return { isValid: true };
            }
            catch (err) {
                const error = err;
                return { isValid: false, error };
            }
        };
        this.isValid = (body, showLogAttributeIsNotValid) => {
            const check = this.verify(body);
            if (!check.isValid) {
                if (showLogAttributeIsNotValid)
                    console.log(check.error.message);
                return false;
            }
            return true;
        };
        this.verifyIsValidAndEmmitValidationError = (body) => {
            const check = this.verify(body);
            if (!check.isValid)
                throw check.error;
            return true;
        };
        this.verifyIsValidAndEmmitHttpError = (body) => {
            const check = this.verify(body);
            if (!check.isValid) {
                throw new BadRequestError_1.BadRequestError(check.error.message, 'VALIDATION_ERROR');
            }
            return true;
        };
        this.adapterToHttpMiddleware = (httpRequestOption) => {
            return (httpRequest) => {
                const data = httpRequest[httpRequestOption];
                if (data === undefined) {
                    throw new Error(`Validator: Data received is undefined (${httpRequestOption})`);
                }
                this.verifyIsValidAndEmmitHttpError(data);
                return httpRequest;
            };
        };
    }
}
exports.Validator = Validator;
