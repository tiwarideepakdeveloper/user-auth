import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-link',
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-link.component.html',
  styleUrl: './admin-link.component.scss',
})
export class AdminLinkComponent {
  @Input() route: Array<String> = [];
  @Input() prefix: string = '/admin';
  
  get fullRoute() {
    return [this.prefix, ...this.route];
  }
  
}
