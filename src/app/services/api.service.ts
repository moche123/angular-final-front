import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject, of } from 'rxjs'; //! FABRICAN OBSERVABLES
import { catchError, map, tap } from 'rxjs/operators'; //! MODIFICAN OBSERVABLES
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.baseUrl;
  public emitLocalStorageFill$ = new ReplaySubject(1);


  constructor(
    private _http: HttpClient,
    private _router:Router
  ) { }

  public login(email:string, password:string):Observable<string>{
    
    const url = `${this.baseUrl}/api/auth`

    const body = { email,password }

    return this._http.post<any>(url,body)
    .pipe(
      //*TAP ==> NO RETORNA NADA (VOID)
      tap(({ok,token,uid,name}) =>{
        if(ok){ //* ok == true
          localStorage.setItem('token',token!) //*  ! ==> Aseguro que el valor siempre llega 
          localStorage.setItem('userId',uid!)
          localStorage.setItem('name',name!)
          Swal.fire(
            'Great!',
            'User logged correctly',
            'success'
          );
          this.emitLocalStorageFill$.next('filled')
        }else{
          localStorage.clear();
          Swal.fire(
            'Oops!',
            'There is something wrong....',
            'error'
          );
        }
      } ),

      map(resp => resp.ok),
      catchError(err=>{
        console.log(err)
        Swal.fire(
          'Oops!',
          err?.error?.msg,
          'error'
        );
        return of(err?.error) //! también existe from ==> retorna un observable
      })
    )

  }

  public register(name:string,email:string,password:string,rol:number,estado:boolean){

    const url = `${this.baseUrl}/api/auth/new`;
    const body = {name,email,password,rol,estado};
    
    return this._http.post<any>(url,body)
            .pipe(
              tap(({ok,token,uid}) =>{

                if(ok){
                  localStorage.setItem('token',token!) //*  ! ==> Aseguro que el valor siempre llega 
                  localStorage.setItem('userId',uid!)
                  localStorage.setItem('name',name!)
                  Swal.fire(
                    'Great!',
                    'User created correctly',
                    'success'
                  );
                  this.emitLocalStorageFill$.next('filled')

                }else{
                  localStorage.clear();
                }
              }),
              map(result=>{
                return result.ok
              }),
              catchError(err=>{
                Swal.fire(
                  'Oops!',
                  err?.error?.msg,
                  'error'
                );
                return of(err.error)
              })
            
            ) 

  }


  public isLoggedIn() :boolean {
    try{
      const localStorageValue = localStorage.getItem('token')
      return localStorageValue ? true : false;
    }catch(err){

      return false;
    }
  }

  public returnToLogin(){
    this._router.navigateByUrl('/auth/login');
  }

  public goToPages(){
    this._router.navigateByUrl('/pages/characters');
  }

  getFavorites(): Observable<any[]> {
    const url = `${this.baseUrl}/api/favorite/${localStorage.getItem('userId')}`;

    return this._http.get(url)
      .pipe(
        map((todo: any) => {
          return todo.favoritos
        })
      )
  }


  addFavorite(body: any): Observable<any> {
    const url = `${this.baseUrl}/api/favorite/newFavorite`;



    return this._http.post<any>(url, body)
      .pipe(
        map(resp => resp.ok),
        catchError(err => {
          // alert(err.error.msg)
          Swal.fire(
            'Oops',
            err.error.msg,
            'error'
          )
          return of(err.error)
        })
      )
  }

  deleteFavorite(IdCharacter:any,IdUser:any): Observable<any> {

    const url = `${this.baseUrl}/api/favorite/deleteFavorite`;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), body: { IdCharacter,IdUser }, };
    // const headers = new HttpHeaders().set(IdCharacter.toString(),IdUser)
    
    return this._http.delete<any>(url,options)
      
      
  }

}
