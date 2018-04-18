import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/Ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients[] = [
    new Ingredients("apple" , 6),
    new Ingredients("orange" , 9)
  ];

  constructor() { }

  ngOnInit() {
  }

}
