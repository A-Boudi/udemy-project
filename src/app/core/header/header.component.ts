import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DataStorageService } from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authState: Observable<fromAuth.State>;

  constructor(private dsService: DataStorageService,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

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
    this.store.dispatch(new AuthActions.Logout())
  }

}
