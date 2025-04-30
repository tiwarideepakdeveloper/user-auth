import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  imports: [
    NgIf
  ],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  isOpen = false;
  
  constructor(private elementRef: ElementRef){}

  changePassword() {
    
  }

  logout() {
    
  }

  /** When Click out side of this component drop down will be hidden */
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if(!this.isOpen) return;
    this.isOpen = !!this.elementRef.nativeElement.contains(targetElement);
  }
}
