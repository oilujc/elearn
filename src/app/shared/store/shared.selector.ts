import { SharedState } from './shared.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getSharedState = createFeatureSelector<SharedState>('shared')

export const getIsLoading = createSelector(
    getSharedState,
    (state: SharedState) => state.isLoading
)
