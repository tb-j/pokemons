import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as fromPokemon from './pokemons/store/pokemon.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonsComponent } from './pokemons/container/pokemons/pokemons.component';
import { SearchFilterPipe } from './pokemons/pipes/search-filter.pipe';
import { CommonModule } from '@angular/common';
import { PokemonService } from './pokemons/service/pokemon.service';
import { RouterModule } from '@angular/router';
import { CatchedComponent } from './pokemons/container/catched/catched.component';
import { WhishlistComponent } from './pokemons/container/whishlist/whishlist.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DetailsComponent } from './pokemons/container/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    DetailsComponent,
    WhishlistComponent,
    CatchedComponent,
    SearchFilterPipe,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot( fromPokemon.reducer, {}),
    StoreModule.forFeature(fromPokemon.pokemonsKey, fromPokemon.reducer),
    NgbModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
