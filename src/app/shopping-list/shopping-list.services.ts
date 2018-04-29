import { Subject } from "rxjs/Subject";

import { Ingredient } from "../shared/Ingredient.model";


export class ShoppingListService {
  shoppingListUpdated = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient("apple" , 6),
    new Ingredient("orange" , 9)
  ];

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.addUpdateIngredient(ingredient);
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    ingredients.forEach(ing => {
      this.addUpdateIngredient(ing);
    });
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

  editIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

  private addUpdateIngredient(ingredient: Ingredient) {
    const ingIndex = this.ingredients.findIndex(i => i.name == ingredient.name);
    if (ingIndex != -1) {
      this.ingredients[ingIndex].amount += ingredient.amount;
    } else {
      this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));
    }
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.shoppingListUpdated.next(this.ingredients.slice())
  }

}