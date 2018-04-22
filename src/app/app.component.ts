import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  activeSection = 'recipe';

  onSectionChanged(showSection: string) {
    this.activeSection = showSection;
    console.log(showSection)
  }

}
