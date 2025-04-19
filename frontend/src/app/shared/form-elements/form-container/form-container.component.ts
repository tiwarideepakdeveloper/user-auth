import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-container',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss'
})
export class FormContainerComponent {
  @Input() form!: FormGroup;
  @Input() title: string = '';
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit();
    } else {
      this.form.markAllAsTouched(); // show validation
    }
  }
}
