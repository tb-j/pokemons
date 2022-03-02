import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSelector from '../../store/pokemon.selectors';
import * as fromPokemonActions from '../../store/pokemon.actions';
import * as fromStore from '../../store/pokemon.reducer';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../service/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PokemonService]
})
export class PokemonsComponent {
  page = 10;

  pokemons$: Observable<Pokemon[]>;
  total$: Observable<number>;
  // catchedPokemons$: Observable<Pokemon[]>;
  // isLoading$: Observable<boolean>;
  // error$: Observable<string | null>;
  catchedPokemons = new Set<string>();
  wishListPokemons = new Set<string>();
  poke: string = '';

  constructor(private store: Store<fromStore.State>, private location: Location, public service: PokemonService) {
    this.pokemons$ = service.pokemons$;
    this.total$ = service.total$;
    // this.error$ = this.store.select(fromSelector.error);
    this.store.select(fromSelector.selectAllCatchedPokemons).subscribe(pokemons => {
      pokemons.forEach((pokemon: Pokemon) => {
        this.catchedPokemons.add(pokemon.name);
      })
    });
    this.store.select(fromSelector.selectAllPokemonsWishList).subscribe(pokemons => {
      pokemons.forEach((pokemon: Pokemon) => {
        this.wishListPokemons.add(pokemon.name);
      })
    });
  }


  addPokemon(pokemon: Pokemon): void {
    const id = parseInt(pokemon.url.slice(-2, -1));
    const pokemon1 = { ...pokemon, id };
    this.store.dispatch(fromPokemonActions.catchPokemon({ pokemon: pokemon1 }));
  }

  addPokemonToWhishlist(pokemon: Pokemon): void {
    const id = parseInt(pokemon.url.slice(-2, -1));
    const pokemon1 = { ...pokemon, id };
    this.store.dispatch(fromPokemonActions.addPokemonToWishList({ pokemon: pokemon1 }));
  }

  back() {
    this.location.back();
  }
}
