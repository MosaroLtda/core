import { IValidateRulesAdapter } from './dtos';
import * as validationsCheck from './validations';

/**
 * use %attributeName% in string of failureMessage to reference attribute name
 */

const rulesAdapter: IValidateRulesAdapter = {
  STRING: {
    handle: validationsCheck.stringTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um texto/string",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  NUMBER: {
    handle: validationsCheck.numberTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um numero",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  DATE: {
    handle: validationsCheck.dateTest,
    failureMessage: "Atributo '%attributeName%' precisa ser uma data válida",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  TIME: {
    handle: validationsCheck.hourTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um tempo valido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  CEP: {
    handle: validationsCheck.cepTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um CEP válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  CNPJ: {
    handle: validationsCheck.cnpjTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um CNPJ válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  CPF: {
    handle: validationsCheck.cpfTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um CPF válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  EMAIL: {
    handle: validationsCheck.emailTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um EMAIL válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  BOOLEAN: {
    handle: validationsCheck.booleanTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um valor BOOLEAN válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  PHONE: {
    handle: validationsCheck.phoneBrTest,
    failureMessage: "Atributo '%attributeName%' precisa ser um valor TELEFONE válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  SPECIAL_CHARACTER: {
    handle: validationsCheck.specialCharacterTest,
    failureMessage: "Atributo '%attributeName%' precisa conter caracteres especiais",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
  PERSONALIZED: {
    failureMessage: "Atributo '%attributeName%' não é válido",
    requiredMessage: "Atributo '%attributeName%' é obrigatorio",
    nullableMessage: "Atributo '%attributeName%' não pode ser nulo",
  },
};

export default rulesAdapter;
