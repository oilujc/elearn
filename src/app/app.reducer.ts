import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
// import { AuthActionTypes } from './auth/store/auth.actions';
// import { AuthState, authReducer } from './auth/store/auth.reducer';
import { SharedState, sharedReducer } from './shared/store/shared.reducer';
import { AuthState, authReducer } from './auth/store/auth.reducer';
import { AuthActionTypes } from './auth/store/auth.actions';

export interface AppState {
    auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer
}

export function localStorageSyncStore(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {

        console.log('state', state)
        console.log('action', action)

        if (action.type === AuthActionTypes.LOGOUT) {
            state = undefined
            localStorage.removeItem('state')
        }


        let storageState = null
        if (localStorage.getItem('state') !== 'undefined') {
            storageState = JSON.parse(localStorage.getItem('state'))
        }

        if (!state && storageState) {
            state = storageState
        } else {
            localStorage.setItem('state', JSON.stringify(state))
        }


        return reducer(state, action);
    };
}
export const metaReducers: MetaReducer<any>[] = [localStorageSyncStore];
