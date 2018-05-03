import * as slActions from './shopping-list.actions';
import { Ingredient } from '../../shared/Ingredient.model';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


const initialState: State = {
  ingredients: [new Ingredient('apple' , 8)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: slActions.ShoppingListActions) {
  switch (action.type) {
    case slActions.ADD_INGREDIENT: {
      const ingredients = state.ingredients;
      const newIng = action.payload;
      const index = ingredients.findIndex(i => i.name === newIng.name);
      if (index > -1) {
        ingredients[index].amount += newIng.amount;
      } else {
        ingredients.push(newIng);
      }
      return {
        ...state,
        ingredients: [...ingredients]
      };
    }
    case slActions.ADD_INGREDIENTS: {
      const ings = state.ingredients;
      const payload = action.payload;
      payload.forEach(ing => {
        const index = ings.findIndex(i => i.name === ing.name);
        if (index > -1) {
          ings[index].amount += ing.amount;
        } else {
          ings.push(new Ingredient(ing.name, ing.amount));
        }
      });
      return {
        ...state,
        ingredients: [...ings]
      };
    }
    case slActions.UPDATE_INGREDIENT: {
      state.ingredients[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: [...state.ingredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case slActions.DELETE_INGREDIENT: {
      state.ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: [...state.ingredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    case slActions.START_EDIT: {
      const editedIngredient = state.ingredients[action.payload];
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    }
    case slActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    }
    default:
      return state;
  }
}
