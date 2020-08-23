import React, { Component } from "react";
import { Navbar } from "./index";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/products";
import CartItemList from "./CartItemList";
import AddProduct from "./AddProduct";
import { prettyDOM } from "@testing-library/react";

class App extends Component {
  //fetch api here
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  //render the components
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

// passing callback function state as props
function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(App);
