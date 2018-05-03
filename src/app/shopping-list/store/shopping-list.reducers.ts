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
    case slActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case slActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case slActions.UPDATE_INGREDIENT:
      state.ingredients[state.editedIngredientIndex] = action.payload;
      return {
        ...state,
        ingredients: [...state.ingredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case slActions.DELETE_INGREDIENT:
      state.ingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: [...state.ingredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case slActions.START_EDIT:
      const editedIngredient = state.ingredients[action.payload];
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case slActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
