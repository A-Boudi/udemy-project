import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../shared/Ingredient.model';
import * as slActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  slState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.slState = this.store.select('shoppingList');
  }

  ingredientSelected(index: number) {
    this.store.dispatch(new slActions.StartEdit(index));
  }

}
