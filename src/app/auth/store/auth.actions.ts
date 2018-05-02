import { Action } from '@ngrx/store'

export const DO_SINGUP = 'DO_SINGUP';
export const SINGUP = 'SINGUP';
export const DO_SINGIN = 'DO_SINGIN';
export const SINGIN = 'SINGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class DoSignup implements Action {
  readonly type = DO_SINGUP;

  constructor(public payload: {email: string, password: string}) {}
}

export class Signup implements Action {
  readonly type = SINGUP;
}

export class DoSignin implements Action {
  readonly type = DO_SINGIN;

  constructor(public payload: {email: string, password: string}) {}
}

export class Signin implements Action {
  readonly type = SINGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = DoSignup | Signup | DoSignin | Signin | Logout | SetToken;