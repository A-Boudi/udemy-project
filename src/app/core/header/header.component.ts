import { Component } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dsService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dsService.storeRecipes().subscribe(
      (response) => {
        console.log(response)
      },
      (error) => console.log(error)
    );
  }

  onFetchData() {
    this.dsService.fetchRecipes();
  }

  onLogout() {
    this.authService.logoutUser();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
