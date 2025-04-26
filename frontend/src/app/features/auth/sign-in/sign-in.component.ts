import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormElementsModule } from '../../../shared/form-elements/form-elements.module';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-sign-in',
  imports: [
    FormElementsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  form: FormGroup;
  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private store: Store
  ) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
  }

  onSubmit() {
    if(this.form.invalid) return;
    this.authService.signIn(this.form.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data.token);
        this.store.dispatch(loginSuccess({ user: response.data }));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
