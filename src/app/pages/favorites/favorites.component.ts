import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IRickMortyApiCharacters } from 'src/app/interfaces/rick-morty.interface';
import { CharacteresService } from 'src/app/services/characteres.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public favorites$: Observable<IRickMortyApiCharacters[]> = new Observable();
  
  constructor( private _characteresService: CharacteresService ){}

  ngOnInit(): void {
    this.getCharacteres()
  }

  getCharacteres(){
    this.favorites$ = this._characteresService.getCharacteresPartial();
  }
}
