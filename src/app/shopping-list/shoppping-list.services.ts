import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Ingredient } from "../shared/Ingredient.model";


export class ShoppingListService {
  shoppingListUpdated = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient("apple" , 6),
    new Ingredient("orange" , 9)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.updateIngredient(ingredient);
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ing => {
      this.updateIngredient(ing);
    });
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

  private updateIngredient(ingredient: Ingredient) {
    const ingIndex = this.ingredients.findIndex(i => i.name == ingredient.name);
    if (ingIndex != -1) {
      this.ingredients[ingIndex].amount += ingredient.amount;
    } else {
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
  }

}