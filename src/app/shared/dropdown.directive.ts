import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core'

@Directive({
    selector: "[appDropdown]"
})
export class DropdownDirective {
    private isShown: boolean = false;

    constructor(private _el: ElementRef) { 

    }

    @HostBinding('class.show') get showed () {
        return this.isShown;
    }
   
    @HostListener('click') toggle() {
        if (this.isShown) {
            this.isShown = false;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show') 
        } else {
            this.isShown = true;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show') 
        }
    }

    /*@HostListener('document:click', ['$event.target']) close (targetElement) {
        let inside: boolean = this._el.nativeElement.contains(targetElement);
        if(!inside) {
            this.isShown = false;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show')
        }
    }*/

}