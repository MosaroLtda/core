export declare type TPersonalizedVerifyFunction<T = any> = (val: T) => boolean;
export declare type TValidateTypeRules = 'CPF' | 'CEP' | 'CNPJ' | 'PHONE' | 'TIME' | 'DATE' | 'EMAIL' | 'STRING' | 'NUMBER' | 'BOOLEAN' | 'LENGTH' | 'SPECIAL_CHARACTER' | 'PERSONALIZED';
export declare type IValidateRulesAdapter = {
    [rule in TValidateTypeRules]?: {
        handle?(value: any): boolean;
        failureMessage: string;
        requiredMessage: string;
        nullableMessage: string;
    };
};
export interface ValidateRule {
    [attributeName: string]: {
        required?: boolean;
        personalizedVerifyFunction?: TPersonalizedVerifyFunction;
        type: TValidateTypeRules;
        isNullable?: boolean;
        failureMessage?: string;
        requiredMessage?: string;
        nullableMessage?: string;
        message?: string;
    };
}
export interface IValidator {
    isValid(body: any): boolean;
    verifyIsValidAndEmmitHttpError(body: any): boolean;
    verifyIsValidAndEmmitValidationError(body: any): boolean;
}
