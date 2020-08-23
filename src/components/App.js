import React, { Component } from "react";
import { Navbar } from "./index";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/products";
import CartItemList from "./CartItemList";
import AddProduct from "./AddProduct";
import { prettyDOM } from "@testing-library/react";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    console.log("Props", this.props);
    const { products, dispatch, isVisibleAddProduct } = this.props;

    return (
      <div>
        <Navbar dispatch={dispatch} products={products} />
        {products.isVisibleAddProduct ? (
          <AddProduct dispatch={dispatch} />
        ) : null}
        <CartItemList products={products} dispatch={dispatch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(App);
