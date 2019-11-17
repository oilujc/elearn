import { User } from '../models/user';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { AppState } from '../../app.reducer';

export interface AuthState {
    username: string
    error: any
}

export const initialState: AuthState = {
    username: null,
    error: null,
}

export function authReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                username: null,
                error: null
            }
        }
        case AuthActionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                error: action.payload
            }
        }
        case AuthActionTypes.LOGOUT: {
            return {
                ...state,
                username: null,
                error: null,
            }
        }
        case AuthActionTypes.SET_USER: {
            return {
                ...state,
                username: action.payload,
                error: null,
            }
        }
        default: {
            return state
        }
    }
}

