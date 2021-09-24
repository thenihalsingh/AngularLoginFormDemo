import { Injectable } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, AbstractControlOptions } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  readonly BaseURI = 'https://localhost:44373/api/';

  formModel = this.fb.group(
    {
      UserName: [
        '', Validators.required
      ],
      Email: [
        '', Validators.email
      ],
      FullName: [''],
      Passwords: this.fb.group(
        {
          Password: [
            '',
            [
              Validators.required, Validators.minLength(4)
            ]
          ],
          ConfirmPassword: ['']
        },
        { validators: this.comparePasswords } as AbstractControlOptions
      )
    });

  comparePasswords(controls: AbstractControl): ValidationErrors | null {
    let pass = controls.get('Password')?.value;
    let confirmPass = controls.get('ConfirmPassword')?.value;
    if (pass === confirmPass) {
      controls.get('ConfirmPassword')?.setErrors(null);
      return null
    } else {
      controls.get('ConfirmPassword')?.setErrors({ passwordMismatch: true });
      return ({ passwordMismatch: true });
    }
  }

  registerUser(): Observable<any> {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    }
    return this.http.post(this.BaseURI + 'ApplicationUser/Register', body);
  }

  login(formDate: any): Observable<any> {
    return this.http.post(this.BaseURI + 'ApplicationUser/Login', formDate);
  }

  getUserProfile(): Observable<any> {
    
    return this.http.get(this.BaseURI + 'UserProfile');
  }
}
