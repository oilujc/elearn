import { SharedActions, SharedActionTypes } from './shared.actions';
import { AppState } from '@app/app.reducer';

export interface SharedState {
    isLoading: boolean
}

export const initialState: SharedState = {
    isLoading: false
}

export function sharedReducer(state = initialState, action: SharedActions): SharedState {
    switch (action.type) {
        case SharedActionTypes.LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default: {
            return state
        }
    }
}
