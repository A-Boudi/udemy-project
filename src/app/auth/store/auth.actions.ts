import { Action } from '@ngrx/store'

export const SINGUP = 'SINGUP';
export const SINGIN = 'SINGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Signup implements Action {
  readonly type = SINGUP;
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

export type AuthActions = Signup | Signin | Logout | SetToken;