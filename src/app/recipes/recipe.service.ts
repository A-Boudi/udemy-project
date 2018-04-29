import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.services";
import { Subject } from "rxjs/Subject";


@Injectable ()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "Oregano Chicken",
      "Preheat oven to 375 degrees F (190 degrees C). Combine the melted butter or margarine, lemon juice, Worcestershire sauce, soy sauce, oregano and garlic powder. Mix well. Place chicken in an ungreased 7x11 inch baking dish. Pour the butter/oregano mixture over the chicken. Bake in the preheated oven for 15 minutes. Baste juices over the chicken. Bake for an additional 15 minutes. Transfer the chicken to a serving platter and serve the pan drippings over hot cooked rice, if desired.",
      "https://images.media-allrecipes.com/userphotos/560x315/17637.jpg", 
      [new Ingredient("Chicken", 1), new Ingredient("Oregano", 4)]
    ),
    new Recipe(
      "Feta Burger",
      "A thing of such delicious, dribble-down-your-chin simplicity, the noble burger can be re-invented time and time again to create the most divine dinnertime results. For this little incarnation, we’ve taken ground lamb and thrown in a Greek twist with a minty fresh kick.",
      "https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_80,w_auto:100:1280/v1/hellofresh_s3/image/minted-lamb-and-feta-burger-bfe21526.jpg",
      [new Ingredient("Wheat", 2), new Ingredient("Eggs", 2), new Ingredient("Soy", 1)]
    )
  ];

  constructor (private slService: ShoppingListService) {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }



}