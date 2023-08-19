import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public myForm:FormGroup = this._fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  });

  public messages:string[] = [];

  constructor( 
    private _fb:FormBuilder,
    private _router:Router
  ) { }


  public submitLogin(){
    this._router.navigateByUrl('/pages')
  }

  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  fieldErrors(field:string){
    
    return this.myForm.controls[field].errors
  }
}
