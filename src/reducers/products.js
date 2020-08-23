import {
  UPDATE_PRODUCTS,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  DELETE_PRODUCT,
  SHOW_ADD_PRODCUT,
  APPEND_PRODUCT,
  HIDE_ADD_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SHOW_CART_ITEMS,
  HIDE_CART_ITEMS,
  EDIT_CHANGE_INLINE,
  ADD_TO_EDITABLE,
  REMOVE_FROM_EDITABLE,
  SORT_BY_PRICE,
} from "../actions/actionTypes";

const initialProductState = {
  list: [],
  cart: [],
  editable: [],
  isVisibleAddProduct: false,
  isCartProducts: false,
  // inline: "hello",
};

export default function products(state = initialProductState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        list: action.products,
      };
    case INCREMENT_PRODUCT:
      return {
        ...state,
      };
    case DECREMENT_PRODUCT:
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      let list = state.list;
      let index = list.indexOf(action.product);

      if (index > -1) {
        list.splice(index, 1);
        state.editable.splice(index, 1);
      }
      return {
        ...state,
        list: list,
      };
    case SHOW_ADD_PRODCUT:
      return {
        ...state,
        isVisibleAddProduct: action.isVisibleAddProduct,
      };
    case APPEND_PRODUCT:
      return {
        ...state,
        list: [...state.list, action.product],
      };
    case HIDE_ADD_PRODUCT:
      return {
        ...state,
        isVisibleAddProduct: action.isVisibleAddProduct,
      };
    case ADD_TO_CART:
      let cartIndex = state.cart.indexOf(action.product);
      if (cartIndex === -1) {
        return {
          ...state,
          cart: [...state.cart, action.product],
        };
      } else {
        return state;
      }

    case REMOVE_FROM_CART:
      let cart = state.cart;
      let Cindex = cart.indexOf(action.product);

      if (Cindex > -1) {
        cart.splice(Cindex, 1);
      }
      return {
        ...state,
        cart: cart,
      };
    case SHOW_CART_ITEMS:
      return {
        ...state,
        isCartProducts: action.isCartProducts,
      };
    case HIDE_CART_ITEMS:
      return {
        ...state,
        isCartProducts: action.isCartProducts,
      };
    case ADD_TO_EDITABLE:
      return {
        ...state,
        editable: [...state.editable, action.product],
      };
    case REMOVE_FROM_EDITABLE:
      return {
        ...state,
        editable: [],
      };
    case "CHANGE_EDIT_INLINE":
      state.list.splice(action.index, 1);
      state.editable.pop();
      state.list.splice(action.index, 0, action.product);
      return {
        ...state,
      };
    case SORT_BY_PRICE: {
      let sortedList = state.list;
      sortedList.sort(compare);
      return {
        ...state,
        list: sortedList,
      };
    }
    default:
      return state;
  }
}
function compare(p1, p2) {
  return p1.price - p2.price;
}
