import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppping-list.services";


@Injectable ()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Recipe 1",
      "Descriptoin of the recipe.",
      "https://assets.servedby-buysellads.com/p/manage/asset/id/32053", 
      [new Ingredient("potato", 2), new Ingredient("sipiuli", 1)]
    ),
    new Recipe(
      2,
      "Recipe 2",
      "Descriptoin of the recipe2.",
      "https://assets.servedby-buysellads.com/p/manage/asset/id/32053",
      [new Ingredient("tomato", 2), new Ingredient("sipiuli", 1)]
    )
  ];

  constructor (private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes.find(i => i.id == id);
  }

}