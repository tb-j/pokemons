import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WhishlistComponent } from './pokemons/container/whishlist/whishlist.component';
import { CatchedComponent } from './pokemons/container/catched/catched.component';
import { DetailsComponent } from './pokemons/container/details/details.component';
import { PokemonsComponent } from './pokemons/container/pokemons/pokemons.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'pokemons' },
  {
    path: 'pokemons',
    component: PokemonsComponent
  },
  {
    path: 'pokemons/:key',
    component: DetailsComponent
  },
  {
    path: 'catched',
    component: CatchedComponent
  },
  {
    path: 'whishlist',
    component: WhishlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
