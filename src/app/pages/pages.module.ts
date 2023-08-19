import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CharacteresComponent } from './characteres/characteres.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SecretComponent } from './secret/secret.component';
import { CharacteresService } from '../services/characteres.service';
import { HttpClientModule } from '@angular/common/http';
import { ImgBreakDirective } from '../directives/img-break.directive';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CharacteresComponent,
    FavoritesComponent,
    SecretComponent,
    ImgBreakDirective,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [ CharacteresService ]
})
export class PagesModule { }
