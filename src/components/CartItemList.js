import React, { Component } from "react";
import InlineEdit from "react-edit-inline2";
import {
  increaseProduct,
  decreaseProduct,
  deleteProduct,
  addtoCart,
  removefromCart,
  addtoEditable,
  removefromEditable,
  changeEditInline,
} from "../actions/products";
import products from "../reducers/products";

class CartItemList extends Component {
  increaseQuantity = (product) => {
    product.count = product.count + 1;
    this.props.dispatch(increaseProduct(product));
  };
  decreaseQuantity = (product) => {
    if (product.count == 0) {
      return;
    }
    product.count = product.count - 1;
    this.props.dispatch(decreaseProduct(product));
  };

  removeProduct = (product) => {
    this.props.dispatch(deleteProduct(product));
  };

  handleAddtoCart = (product) => {
    this.props.dispatch(addtoCart(product));
  };
  handleRemovefromCart = (product) => {
    this.props.dispatch(removefromCart(product));
  };

  isAddedtoCart = (product) => {
    const { cart } = this.props.products;

    let index = cart.indexOf(product);
    if (index == -1) {
      return false;
    }
    return true;
  };

  handleAddtoEditable = (product) => {
    this.props.dispatch(addtoEditable(product));
  };
  handleRemovefromEditable = (product) => {
    this.props.dispatch(removefromEditable(product));
  };
  isAddedtoEditable = (product) => {
    const { editable } = this.props.products;

    let index = editable.indexOf(product);
    if (index == -1) {
      return false;
    }
    return true;
  };

  handleChange = (fieldName, val, product) => {
    product[fieldName] = val;
  };

  submitEditChange = (product, index) => {
    this.props.dispatch(changeEditInline(product, index));
  };

  render() {
    const { products } = this.props;
    const { list, isCartProducts, cart } = products;
    const displayProducts = isCartProducts ? cart : list;
    console.log("Products lists", products);
    let isCart = false;

    return (
      <div className="product-lists">
        {isCartProducts ? <h1>Cart Items</h1> : null}
        {displayProducts.map((product, index) => (
          <div className="cart-item" key={index}>
            <div className="left-block">
              <img style={Style.image} src={product.imgUrl} />
            </div>
            <div className="right-block">
              {this.isAddedtoEditable(product) ? (
                <input
                  type="text"
                  defaultValue={product.name}
                  onChange={(e) =>
                    this.handleChange("name", e.target.value, product)
                  }
                />
              ) : (
                <div style={{ fontSize: 25 }}>{product.name}</div>
              )}
              {this.isAddedtoEditable(product) ? (
                <input
                  className="cart-item-desc"
                  style={{ display: "block" }}
                  type="textarea"
                  defaultValue={product.description}
                  onChange={(e) =>
                    this.handleChange("description", e.target.value, product)
                  }
                />
              ) : (
                <div className="cart-item-desc">{product.description}</div>
              )}

              {this.isAddedtoEditable(product) ? (
                <input
                  type="number"
                  defaultValue={product.price}
                  onChange={(e) =>
                    this.handleChange("price", e.target.value, product)
                  }
                />
              ) : (
                <div style={{ color: "#777" }}>Rs. {product.price}</div>
              )}

              <div className="btn-grp">
                {this.isAddedtoEditable(product) && (
                  <button
                    onClick={() => {
                      this.submitEditChange(product, index);
                    }}
                    className="button save-btn"
                  >
                    Save
                  </button>
                )}
              </div>

              <div style={{ color: "#777" }}>Qty: {product.count}</div>
              <div className="cart-item-actions">
                <img
                  alt="increase"
                  className="action-icons"
                  src="https://image.flaticon.com/icons/svg/929/929409.svg"
                  onClick={() => this.increaseQuantity(product)}
                />
                <img
                  alt="decrease"
                  className="action-icons"
                  src="https://image.flaticon.com/icons/svg/148/148765.svg"
                  onClick={() => this.decreaseQuantity(product)}
                />
                <img
                  alt="delete"
                  className="action-icons"
                  src="https://image.flaticon.com/icons/svg/1632/1632602.svg"
                  onClick={() => this.removeProduct(product)}
                />
                <img
                  alt="edit"
                  className="action-icons"
                  src="https://image.flaticon.com/icons/svg/603/603519.svg"
                  onClick={() => this.handleAddtoEditable(product)}
                />
                {this.isAddedtoCart(product) ? (
                  <img
                    alt="add-to-cart"
                    className="action-icons added-cart"
                    src="https://image.flaticon.com/icons/svg/126/126515.svg"
                    onClick={() => this.handleRemovefromCart(product)}
                  />
                ) : (
                  <img
                    alt="add-to-cart"
                    className="action-icons"
                    src="https://image.flaticon.com/icons/svg/70/70021.svg"
                    onClick={() => this.handleAddtoCart(product)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const Style = {
  image: {
    height: 150,
    width: 140,
    borderRadius: 4,
    background: "#ccc",
  },
};

export default CartItemList;
