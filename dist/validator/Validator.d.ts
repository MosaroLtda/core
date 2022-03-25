import { HttpHandleMiddleware, HttpRequestOptions } from '../interfaces/http';
import { IValidator, ValidateRule } from './dtos';
export declare class Validator<BodyInterface = any> implements IValidator {
    private readonly validateRules;
    constructor(validateRules: ValidateRule);
    private verify;
    isValid(body: BodyInterface, showLogAttributeIsNotValid?: boolean): boolean;
    verifyIsValidAndEmmitValidationError(body: BodyInterface): boolean;
    verifyIsValidAndEmmitHttpError(body: BodyInterface): boolean;
    adapterToHttpMiddleware(httpRequestOption: HttpRequestOptions): HttpHandleMiddleware;
}
