import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/Ingredient.model';
import { ShoppingListService } from '../shoppping-list.services';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  addIngredient(nameInput: HTMLInputElement) {
    const ingName = this.nameInput.nativeElement.value;
    const ingAmount = +this.amountInput.nativeElement.value;
    this.shoppingListService.addIngredient(new Ingredient(ingName, ingAmount));
  }

}
