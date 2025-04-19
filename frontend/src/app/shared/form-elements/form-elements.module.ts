import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { FormContainerComponent } from './form-container/form-container.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    FormContainerComponent
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    FormContainerComponent
  ]
})
export class FormElementsModule { }
