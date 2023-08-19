import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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

  public message:string[] = [];

  constructor( 
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: ApiService
  ) { }


  submitRegister() {
    const { name, email, password } = this.myForm.value;

    this._authService.register(name, email, password, 1, true)
      .subscribe(result => {
        if (result === true) {
          this._router.navigateByUrl('/pages')
        } else {

          if (result.msg) {
            setTimeout(() => {
              this.message.push(result.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

          if (result.errors?.name) {
            setTimeout(() => {
              this.message.push(result.errors.name.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }
          if (result.errors?.email) {
            setTimeout(() => {
              this.message.push(result.errors.email.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

          if (result.errors?.password) {
            setTimeout(() => {
              this.message.push(result.errors.password.msg);
            }, 300);

            setTimeout(() => {
              this.message = [];
            }, 3100)
          }

        }
      })



  }

  fieldIsValidReactive(field:string){
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  fieldErrors(field:string){
    
    return this.myForm.controls[field].errors
  }
}
