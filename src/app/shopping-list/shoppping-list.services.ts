import { EventEmitter } from "@angular/core";

import { Ingredient } from "../shared/Ingredient.model";


export class ShoppingListService {
  shoppingListUpdated = new EventEmitter<Ingredient>();
  ingredients: Ingredient[] = [
    new Ingredient("apple" , 6),
    new Ingredient("orange" , 9)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.updateIngredient(ingredient);
    this.shoppingListUpdated.emit()
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ing => {
      this.updateIngredient(ing);
    });
    this.shoppingListUpdated.emit()
  }

  private updateIngredient(ingredient: Ingredient) {
    const ingIndex = this.ingredients.findIndex(i => i.name == ingredient.name);
    if (ingIndex != -1) {
      this.ingredients[ingIndex].amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }

}