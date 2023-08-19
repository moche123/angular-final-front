import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRickMortyApiCharacters } from 'src/app/interfaces/rick-morty.interface';
import { ApiService } from 'src/app/services/api.service';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public favorites$: Observable<any[]> = new Observable();

  constructor( private _apiService: ApiService ){}

  ngOnInit(): void {
    this.getCharacteres()
  }

  getCharacteres(){
    this.favorites$ = this._apiService.getFavorites()
  }
}
