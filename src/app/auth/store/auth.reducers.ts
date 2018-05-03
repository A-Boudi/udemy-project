import * as authState from './auth.actions';


export interface State {
  token: string,
  authenticated: boolean
}

const initialState: State = {
  token: null,
  authenticated: false
}

export function AuthReducer(state = initialState, action: authState.AuthActions) {
  switch (action.type) {
    case authState.SINGUP:
    case authState.SINGIN:
      return {
        ...state,
        authenticated: true,
      };
    case authState.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: null
      };
    case authState.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}