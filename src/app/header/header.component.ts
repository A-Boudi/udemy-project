import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onSectionChange = new EventEmitter<string>();
  @Input() activeSection: string;

  constructor() { }

  ngOnInit() {
  }

  onMenuChange(option: string) {
    //this.activeSection = 1;
    this.onSectionChange.emit(option);
    console.log(this.activeSection);
  }

}
