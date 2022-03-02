import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromActions from '../../store/pokemon.actions';
import * as fromStore from '../../store/pokemon.reducer';
import * as fromSelector from '../../store/pokemon.selectors';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../service/pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-catched',
  templateUrl: './catched.component.html',
  providers: [PokemonService]
})
export class CatchedComponent {
  page = 10;

  catchedPokemons$: Observable<Pokemon[]>;

  constructor(private store: Store<fromStore.State>, public service: PokemonService, private location: Location) {
    this.catchedPokemons$ = this.store.select(fromSelector.selectAllCatchedPokemons);
  }

  removePokemon(id?: string): void {
    if (id) {
      this.store.dispatch(fromActions.deleteCatchedPokemon({ id }));
    }
  }

  back(): void {
    this.location.back();
  }
}
