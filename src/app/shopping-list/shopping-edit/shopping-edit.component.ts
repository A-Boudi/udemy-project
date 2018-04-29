import { Component, ViewChild, ElementRef, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms"

import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.services';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingEditForm') slEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editIndex = index;
          const ingredient = this.slService.getIngredient(index);
          this.slEditForm.setValue({
            "name": ingredient.name,
            "amount": ingredient.amount
          })
        }
      )
  }

  onSubmit() {
    const value = this.slEditForm.value;
    const ingredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.slService.editIngredient(this.editIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onClear() {
    this.slEditForm.form.reset();
    this.editMode = false;
    this.editIndex = -1;
  }

  onDelete() {
    if(this.editMode) {
      this.slService.deleteIngredient(this.editIndex);
      this.onClear();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
