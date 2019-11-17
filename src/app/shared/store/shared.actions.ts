import { Action } from '@ngrx/store';

export enum SharedActionTypes {
    LOADING = '[Shared] Loading'
}

export class Loading implements Action {
    readonly type = SharedActionTypes.LOADING
    constructor(public payload: boolean) {}
}

export type SharedActions =
| Loading