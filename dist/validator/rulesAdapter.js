"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationsCheck = __importStar(require("./validations"));
const rulesAdapter = {
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
exports.default = rulesAdapter;
