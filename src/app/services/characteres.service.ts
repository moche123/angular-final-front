import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, take } from 'rxjs/operators';

import {
  IRickMortyApi,
  IRickMortyApiCharacters,
} from '../interfaces/rick-morty.interface';
import Swal from 'sweetalert2';

@Injectable()
export class CharacteresService {
  constructor(private _httpClient: HttpClient) {}

  getCharacteres(): Observable<IRickMortyApiCharacters[]> {
    return this._httpClient
      .get<IRickMortyApi>('https://rickandmortyapi.com/api/character')
      .pipe(
        map((res) => res.results),
       // tap(console.log),
        catchError((_) => {
          Swal.fire(
            'Oops!',
            'There is something wrong with the request',
            'error'
          );
          return of([]);
        })
      );
  }

  getCharacteresPartial(): Observable<IRickMortyApiCharacters[]> {
    return this.getCharacteres().pipe(
        map( res => res.slice(0,5) )
    )
  }
}
