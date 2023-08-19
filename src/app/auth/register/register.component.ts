import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public myForm:FormGroup = this._fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.required,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(6)]]
  });

  public messages:string[] = [];

  constructor( 
    private _fb:FormBuilder
  ) { }


  public submitRegister(){
    console.log(this.myForm.value);
  }

  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  fieldErrors(field:string){
    
    return this.myForm.controls[field].errors
  }
}
