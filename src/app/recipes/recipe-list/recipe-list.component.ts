import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Recipe 1", "Descriptoin of the recipe.", "https://assets.servedby-buysellads.com/p/manage/asset/id/32053"),
    new Recipe("Recipe 2", "Descriptoin of the recipe3.", "https://assets.servedby-buysellads.com/p/manage/asset/id/32053")
  ];
  @Output() onRecipeChange = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  selectedRecipeChanged(recipe: Recipe) {
    this.onRecipeChange.emit(recipe);
  }

}
