import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './pokemon.reducer';

export const selectExampleModule = createFeatureSelector<fromStore.State>(fromStore.pokemonsKey);

export const selectCatchedPokemons = createSelector(selectExampleModule, fromStore.selectCatchedPokemonsState);
export const selectWhishList = createSelector(selectExampleModule, fromStore.selectWishListState);

export const selectAllCatchedPokemons = createSelector(selectCatchedPokemons, fromStore.selectCatchedPokemons);
export const selectAllPokemonsWishList = createSelector(selectWhishList, fromStore.selectWishList);
