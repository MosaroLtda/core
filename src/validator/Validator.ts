import { BadRequestError } from '../errors/http/BadRequestError';
import { ValidationError } from '../errors/validator/ValidationError';
import { HttpHandleMiddleware, HttpRequestOptions } from '../interfaces/http';
import { IValidator, ValidateRule } from './dtos';
import rulesAdapter from './rulesAdapter';

export class Validator<BodyInterface = any> implements IValidator {
  constructor(private readonly validateRules: ValidateRule) {}

  private verify = (body: BodyInterface) => {
    try {
      const attributesToValidate = Object.keys(this.validateRules);

      attributesToValidate.forEach((attributeName) => {
        const attributeDefinedRule = this.validateRules[attributeName];
        const rule = rulesAdapter[attributeDefinedRule.type];

        if (!rule) {
          throw new Error(`Invalid type '${attributeDefinedRule.type}' for attribute '${attributeName}'`);
        }

        if (attributeDefinedRule.type === 'PERSONALIZED') {
          rule.handle = attributeDefinedRule.personalizedVerifyFunction;
        }

        const attributeValue = body[attributeName];

        const valueIsEmpty = attributeValue === undefined;
        const valueIsNull = attributeValue === null;

        if (!attributeDefinedRule.required && valueIsEmpty) return true;

        const { requiredMessage, nullableMessage, message, failureMessage } = attributeDefinedRule;

        if (attributeDefinedRule.required && valueIsEmpty) {
          if (typeof requiredMessage === 'string' || typeof message === 'string') {
            throw new ValidationError(requiredMessage || message);
          }

          throw new ValidationError(rule.requiredMessage.replace('%attributeName%', attributeName));
        }

        if (!attributeDefinedRule.isNullable && valueIsNull) {
          if (typeof nullableMessage === 'string' || typeof message === 'string') {
            throw new ValidationError(nullableMessage || message);
          }

          throw new ValidationError(rule.nullableMessage.replace('%attributeName%', attributeName));
        }

        const attributeIsValid = rule.handle(attributeValue);

        if (!attributeIsValid) {
          if (typeof failureMessage === 'string' || typeof message === 'string') {
            throw new ValidationError(failureMessage || message);
          }

          throw new ValidationError(rule.failureMessage.replace('%attributeName%', attributeName));
        }
      });

      return { isValid: true };
    } catch (err) {
      const error: ValidationError = err;
      return { isValid: false, error };
    }
  };

  isValid = (body: BodyInterface, showLogAttributeIsNotValid?: boolean): boolean => {
    const check = this.verify(body);

    if (!check.isValid) {
      if (showLogAttributeIsNotValid) console.log(check.error.message);

      return false;
    }

    return true;
  };

  verifyIsValidAndEmmitValidationError = (body: BodyInterface) => {
    const check = this.verify(body);

    if (!check.isValid) throw check.error;

    return true;
  };

  verifyIsValidAndEmmitHttpError = (body: BodyInterface) => {
    const check = this.verify(body);

    if (!check.isValid) {
      throw new BadRequestError(check.error.message, 'VALIDATION_ERROR');
    }

    return true;
  };

  adapterToHttpMiddleware = (httpRequestOption: HttpRequestOptions): HttpHandleMiddleware => {
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
