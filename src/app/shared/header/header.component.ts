import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private _apiService:ApiService, private _router:Router){}
  public title = 'Navbar';

  ngOnInit(): void {
    
    if(localStorage.getItem('name')){

      this.title = localStorage.getItem('name')!;
    }

    this._apiService.emitLocalStorageFill$.asObservable().subscribe( _ => {
      console.log('RECEIVED NEXT')
      this.title = localStorage.getItem('name')!;
    })
  }


  closeSession(){
    localStorage.clear();
    this._router.navigateByUrl('/auth/login')
  }
}
