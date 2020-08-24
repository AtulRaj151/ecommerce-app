import React from "react";
import {
  showAddProduct,
  showCartItem,
  hideCartItem,
  sortByPrice,
} from "../actions/products";

class Navbar extends React.Component {
  // navbar items to show add products in navbar
  handleAddProduct = (val) => {
    this.props.dispatch(showAddProduct(val));
  };
  // function to show cart item page in navbar
  handleShowCartItem = (val) => {
    this.props.dispatch(showCartItem(val));
  };
  // hide the cart item
  handleHideCartItem = (val) => {
    this.props.dispatch(hideCartItem(val));
  };
  //sort the products
  handleSortByPrice = () => {
    this.props.dispatch(sortByPrice());
  };
  render() {
    const { cart, isCartProducts } = this.props.products;
    return (
      <div className="nav">
        <div
          onClick={() => this.handleHideCartItem(false)}
          className={`all-products ${isCartProducts ? " " : "active"}`}
        >
          Products
        </div>
        <div
          onClick={() => this.handleAddProduct(true)}
          className="cart-add-products"
        >
          Add Products
        </div>
        <button
          className="sort-by-price"
          onClick={() => this.handleSortByPrice()}
        >
          SORT BY PRICE
        </button>

        <div
          onClick={() => this.handleShowCartItem(true)}
          className="cartIconContainer"
        >
          <img
            className="cartIcon"
            src="https://image.flaticon.com/icons/svg/630/630746.svg"
            alt="carticon"
          />
          <span className="cartCount">{cart.length}</span>
        </div>
      </div>
    );
  }
}

export default Navbar;
