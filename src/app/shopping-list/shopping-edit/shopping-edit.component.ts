import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/Ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import * as slActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') slEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = data.editedIngredient;
          this.slEditForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
          })
        } else {
          this.editMode = false;
          this.editedItem = null;
        }
      }
    )
  }

  onSubmit() {
    const value = this.slEditForm.value;
    const ingredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.store.dispatch(new slActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new slActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.store.dispatch(new slActions.StopEdit());
    this.slEditForm.form.reset();
  }

  onDelete() {
    if(this.editMode) {
      this.store.dispatch(new slActions.DeleteIngredient());
      this.slEditForm.form.reset();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new slActions.StopEdit());
  }
}
