import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../action-types/cartActionTypes";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (product) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === product.id ? item : cartItem
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export { cartReducer };
