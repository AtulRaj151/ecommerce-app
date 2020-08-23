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
  REMOVE_FROM_EDITABLE,
  ADD_TO_EDITABLE,
} from "./actionTypes";
import { findByDisplayValue } from "@testing-library/react";
export function fetchProducts() {
  return (dispatch) => {
    const url =
      "https://my-json-server.typicode.com/AtulRaj151/ecommerce-data/db";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data in fetch ", data.products);
        dispatch(updateProducts(data.products));
      });
  };
}
export function updateProducts(products) {
  return {
    type: UPDATE_PRODUCTS,
    products,
  };
}
export function increaseProduct(product) {
  return {
    type: INCREMENT_PRODUCT,
    product,
  };
}
export function decreaseProduct(product) {
  return {
    type: DECREMENT_PRODUCT,
    product,
  };
}

export function deleteProduct(product) {
  return {
    type: DELETE_PRODUCT,
    product,
  };
}
export function showAddProduct(val) {
  return {
    type: SHOW_ADD_PRODCUT,
    isVisibleAddProduct: val,
  };
}
export function appendProduct(product) {
  return {
    type: APPEND_PRODUCT,
    product,
  };
}

export function hideAddProduct(val) {
  return {
    type: HIDE_ADD_PRODUCT,
    isVisibleAddProduct: val,
  };
}
export function addtoCart(product) {
  return {
    type: ADD_TO_CART,
    product,
  };
}
export function removefromCart(product) {
  return {
    type: REMOVE_FROM_CART,
    product,
  };
}

//editable
export function addtoEditable(product) {
  return {
    type: ADD_TO_EDITABLE,
    product,
  };
}
export function removefromEditable(product) {
  return {
    type: REMOVE_FROM_EDITABLE,
    product,
  };
}

export function showCartItem(val) {
  return {
    type: SHOW_CART_ITEMS,
    isCartProducts: val,
  };
}
export function hideCartItem(val) {
  return {
    type: HIDE_CART_ITEMS,
    isCartProducts: val,
  };
}
export function editChange(product) {
  return {
    type: EDIT_CHANGE_INLINE,
    product,
  };
}

export function changeEditInline(product, index) {
  return {
    type: "CHANGE_EDIT_INLINE",
    product,
    index,
  };
}
// export function changeText(inline) {
//   {
//     return {
//       type: CHANGE,
//       inline,
//     };
//   }
// }
