import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store/pokemon.reducer';
import * as fromSelector from '../../store/pokemon.selectors';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../service/pokemon.service';
import { Location } from '@angular/common';
import * as fromPokemonActions from '../../store/pokemon.actions';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  providers: [PokemonService]
})
export class WhishlistComponent {
  page = 10;

  pokemonsWishListt$: Observable<Pokemon[]>;

  constructor(private store: Store<fromStore.State>, public service: PokemonService, private location: Location) {
    this.pokemonsWishListt$ = this.store.select(fromSelector.selectAllPokemonsWishList);
  }

  removePokemon(id?: string): void {
    if (id) {
      this.store.dispatch(fromPokemonActions.deleteWhishlistPokemon({ id }));
    }
  }
  back(): void {
    this.location.back();
  }
}
