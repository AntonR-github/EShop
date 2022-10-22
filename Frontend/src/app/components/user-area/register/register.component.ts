import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  isSubmitted = false;
  returnUrl =  '';
  isHidden = true;
  

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      userID: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    },{
      validator: PasswordsMatchValidator('password', 'confirmPassword')
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() { 
    return this.registerForm.controls; 
  }

  toggleComponent() {
    if(!this.registerForm.controls.userID.valid || !this.registerForm.controls.email.valid || !this.registerForm.controls.password.valid || !this.registerForm.controls.confirmPassword.valid) return;
    else
    this.isHidden = !this.isHidden;
  }
  
    
  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const user: IUserRegister = {
      firstName: fv.firstName,
      lastName: fv.lastName,
      email: fv.email,
      userID: fv.userID,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      city: fv.city,
      street: fv.street  
    };
    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    });

    }
  }
