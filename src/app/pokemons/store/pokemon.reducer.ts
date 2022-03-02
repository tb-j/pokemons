import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';
import * as PokemonActions from './pokemon.actions';

export const pokemonsKey = 'pokemons';
interface MyPokemonState extends EntityState<Pokemon> {
}
interface MyWhishlistPokemonState extends EntityState<Pokemon> {
}
export interface State {
  mypokemons: MyPokemonState;
  myWhishlist: MyWhishlistPokemonState;
}

const adapterMyPokemon = createEntityAdapter<Pokemon>();
const adapterMyWhishlist = createEntityAdapter<Pokemon>();

const mypokemonsInitialState: MyPokemonState = adapterMyPokemon.getInitialState();
const myWhishlistInitialState: MyWhishlistPokemonState = adapterMyWhishlist.getInitialState();

const initialState = {
  mypokemons: mypokemonsInitialState,
  myWhishlist: myWhishlistInitialState,
}

export const reducer = createReducer(
  initialState,
  on(PokemonActions.catchPokemon,
    (state, action) => ({ ...state, mypokemons: adapterMyPokemon.addOne(action.pokemon, state.mypokemons) })
  ),
  on(PokemonActions.deleteCatchedPokemon,
    (state, action) => ({ ...state, mypokemons: adapterMyPokemon.removeOne(action.id, state.mypokemons) })
  ),
  on(PokemonActions.addPokemonToWishList,
    (state, action) => ({ ...state, myWhishlist: adapterMyPokemon.addOne(action.pokemon, state.myWhishlist) })
  ),
  on(PokemonActions.deleteWhishlistPokemon,
    (state, action) => ({ ...state, myWhishlist: adapterMyPokemon.removeOne(action.id, state.myWhishlist) })
  ),
);

export const selectCatchedPokemonsState = (state: State) => state.mypokemons;
export const selectWishListState = (state: State) => state.myWhishlist;

export const { selectAll: selectCatchedPokemons } = adapterMyPokemon.getSelectors();
export const { selectAll: selectWishList } = adapterMyWhishlist.getSelectors();
