import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminLinkComponent } from '../component/admin-link/admin-link.component';
import { CommonModule } from '@angular/common';
import { CanDirective } from '../../../core/directives/can/can.directive';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet, 
    AdminLinkComponent, 
    CommonModule, 
    CanDirective
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
    
  isSideBarOpen : boolean = false;

}
