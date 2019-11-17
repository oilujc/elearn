import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] LogIn',
    LOGIN_SUCCESS = '[Auth] LogIn Success',
    LOGIN_FAILURE = '[Auth] LogIn Failure',
    LOGOUT = '[Auth] LogOut',
    LOGOUT_SUCCESS = '[Auth] LogOut Success',
    SET_USER = '[Auth] Set User'
}

export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN
    constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS
    constructor(public payload: any) {}
}

export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE
    constructor(public payload: any) {}
}

export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT
    constructor(public payload: any) {}
}

export class LogOutSuccess implements Action {
    readonly type = AuthActionTypes.LOGOUT_SUCCESS
    constructor(public payload: any) {}
}

export class SetUser implements Action {
    readonly type = AuthActionTypes.SET_USER
    constructor(public payload: any) {}
}

export type AuthActions =
| LogIn
| LogInSuccess
| LogInFailure
| LogOut
| LogOutSuccess
| SetUser
