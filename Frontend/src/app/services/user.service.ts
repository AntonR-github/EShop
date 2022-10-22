import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { UserModel } from '../shared/models/user.model';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<UserModel>(this.getUserFromLocalStorage());
  public userObservable:Observable<UserModel>; 

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser():UserModel{
    return this.userSubject.value;
   }

   login(userLogin:IUserLogin):Observable<UserModel>{
     return this.http.post<UserModel>(environment.loginUrl, userLogin).pipe(
      tap({
        next: (user) => {
           this.setUserToLocalStorage(user)
           this.userSubject.next(user);
           this.toastrService.success(
            `Welcome ${user.firstName} ${user.lastName}!`,
            'Login Successful'
            )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      }));
    }

    register(userRegister:IUserRegister):Observable<UserModel>{
      return this.http.post<UserModel>(environment.registerUrl, userRegister).pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user)
            this.userSubject.next(user);
            this.toastrService.success(
              `Welcome ${user.firstName} ${user.lastName}!`,
              'Registration Successful'
            )
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Registration Failed');
          }
        }));
    }

    logout(){
      this.userSubject.next(new UserModel());
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }
  

    private setUserToLocalStorage(user:UserModel){
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }

    private getUserFromLocalStorage():UserModel{
      const userJson = localStorage.getItem(USER_KEY);
      if(userJson) return JSON.parse(userJson) as UserModel;
      return new UserModel();
    }

    public getCurrentUser():UserModel{
      return this.userSubject.value;
    }




}
