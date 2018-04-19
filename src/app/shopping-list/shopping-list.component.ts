import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("apple" , 6),
    new Ingredient("orange" , 9)
  ];

  constructor() { }

  ngOnInit() {
  }

  updateIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

}
