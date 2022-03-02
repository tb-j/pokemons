import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  results: Pokemon[];
  count: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _pokemons$ = new BehaviorSubject<Pokemon[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: ''
  };

  constructor(private http: HttpClient) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._pokemons$.next(result.results);
      this._total$.next(result.count);
    });

    this._search$.next();
  }

  get pokemons$() { return this._pokemons$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page } = this._state;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(pokemon: string): Observable<any[]> {
    return this.http.get<any[]>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }
}
