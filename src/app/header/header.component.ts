import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() onSectionChange = new EventEmitter<string>();
  @Input() activeSection: string;

  constructor() { }

  onMenuChange(option: string) {
    //this.activeSection = 1;
    this.onSectionChange.emit(option);
    console.log(this.activeSection);
  }

}
