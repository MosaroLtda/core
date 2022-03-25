export interface ICreateUsuarioByPessoa {
  cod_pessoa: number;
  login: string;
  senha: string;
  cods_regras: number[];
  cods_grupos_sistema: number[];
  cod_usuario?: number;
}

export interface IForgotPasswordData {
  email: string;
  cod_municipio: number;
  cod_parque_servico: number;
}

export interface IResetPasswordData {
  token: string;
  new_password: string;
  verify_password: string;
}

export interface IForgotToken {
  cod_reclamante?: number;
  cod_usuario?: number;
  type: 'user' | 'complainer';
}
