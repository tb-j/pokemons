import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';


export const catchPokemon = createAction(
  '[Pokemon/API] Catch Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const addPokemonToWishList = createAction(
  '[Pokemon/API] Add Pokemon to whishlist',
  props<{ pokemon: Pokemon }>()
);

export const deleteCatchedPokemon = createAction(
  '[Pokemon/API] Delete Pokemon',
  props<{ id: string }>()
);

export const deleteWhishlistPokemon = createAction(
  '[Pokemon/API] Delete Pokemon from Wishlist',
  props<{ id: string }>()
);
