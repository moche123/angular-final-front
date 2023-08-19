import { Component, OnInit } from '@angular/core';
import { CharacteresService } from '../../services/characteres.service';
import { IRickMortyApiCharacters } from '../../interfaces/rick-morty.interface';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characteres',
  templateUrl: './characteres.component.html',
  styleUrls: ['./characteres.component.scss']
})
export class CharacteresComponent implements OnInit {
  public characteres$: Observable<IRickMortyApiCharacters[]> = new Observable();
  
  constructor( private _characteresService: CharacteresService, private _apiService:ApiService, private _router:Router ){}

  ngOnInit(): void {
    this.getCharacteres()
  }

  getCharacteres(){
    this.characteres$ = this._characteresService.getCharacteres();
  }

  addFavorite(character:any){
    const body = {
      IdCharacter: character.id,
      IdUser: localStorage.getItem('userId'),
      nameCharacter: character.name,
      caracterUrlImagen: character.image,
      token: localStorage.getItem('token')
    }

    this._apiService.addFavorite(body).subscribe(ok => {

      if(ok !== false && typeof(ok) === 'boolean' ){
        this._router.navigateByUrl('/pages/favorites');
      }
    })
  }
}
