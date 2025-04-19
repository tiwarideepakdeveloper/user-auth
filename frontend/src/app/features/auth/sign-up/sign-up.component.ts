import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormElementsModule } from '../../../shared/form-elements/form-elements.module';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.firstNameControl = this.form.get('firstName') as FormControl;
    this.lastNameControl = this.form.get('lastName') as FormControl;
    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
  }

  onSubmit() {
    if(this.form.invalid){
      console.log(this.emailControl?.errors?.['required']);
      return;
    }
    console.log(this.form.value);
  }
}
