import { Component, OnInit } from '@angular/core';
import { CharacteresService } from '../../services/characteres.service';
import { IRickMortyApiCharacters } from '../../interfaces/rick-morty.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {
  public characteres$: Observable<IRickMortyApiCharacters[]> = new Observable();
  
  constructor( private _characteresService: CharacteresService ){}

  ngOnInit(): void {
    this.getCharacteres()
  }

  getCharacteres(){
    this.characteres$ = this._characteresService.getCharacteres();
  }
}
