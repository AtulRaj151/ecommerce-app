import React from "react";
import {
  showAddProduct,
  showCartItem,
  hideCartItem,
} from "../actions/products";

class Navbar extends React.Component {
  handleAddProduct = (val) => {
    this.props.dispatch(showAddProduct(val));
  };
  handleShowCartItem = (val) => {
    this.props.dispatch(showCartItem(val));
  };
  handleHideCartItem = (val) => {
    this.props.dispatch(hideCartItem(val));
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
