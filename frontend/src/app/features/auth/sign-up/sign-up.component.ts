import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormElementsModule } from '../../../shared/form-elements/form-elements.module';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../core/store/user/user.actions';
import { setPermissions } from '../../../core/store/permissions/permissions.actions';

@Component({
  selector: 'app-sign-up',
  imports: [
    FormElementsModule,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  form: FormGroup;
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  cnfPasswordControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store
  ) {
    this.form = this.fb.group({
      user_first_name: ['', Validators.required],
      user_last_name: [''],
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', Validators.required],
      user_cnf_password: ['', Validators.required],
    });

    this.firstNameControl = this.form.get('user_first_name') as FormControl;
    this.lastNameControl = this.form.get('user_last_name') as FormControl;
    this.emailControl = this.form.get('user_email') as FormControl;
    this.passwordControl = this.form.get('user_password') as FormControl;
    this.cnfPasswordControl = this.form.get('user_cnf_password') as FormControl;
  }

  onSubmit() {
    if(this.form.invalid) return;
    if(this.passwordControl.value != this.cnfPasswordControl.value){
      this.cnfPasswordControl?.setErrors({ cnfPasswordMisMatch: true });
      return;
    }
    this.authService.signUp(this.form.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data.token);
        this.store.dispatch(loginSuccess({ user: response.data }));
        let permissions = response.data.user_roles.flatMap((role) => role.permissions).map((perm) => perm.permission_name);
        this.store.dispatch(setPermissions({ permissions: permissions }));
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
