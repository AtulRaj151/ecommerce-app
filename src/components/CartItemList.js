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
import { notify, notifyw } from "./Notifications";

class CartItemList extends Component {
  //increase the cart items
  increaseQuantity = (product) => {
    product.count = product.count + 1;
    this.props.dispatch(increaseProduct(product));
  };
  //decrease the cart items
  decreaseQuantity = (product) => {
    if (product.count == 0) {
      return;
    }
    product.count = product.count - 1;
    this.props.dispatch(decreaseProduct(product));
  };
  // removes the products from the products list
  removeProduct = (product) => {
    this.props.dispatch(deleteProduct(product));
    notifyw("Product removed");
  };
  // add the product to cart array
  handleAddtoCart = (product) => {
    this.props.dispatch(addtoCart(product));
    notify("Added to Cart");
  };

  // removes the products from cart array on toggle
  handleRemovefromCart = (product) => {
    this.props.dispatch(removefromCart(product));
    notifyw("Removed from Cart");
  };
  // this function checks if product is added in cart array and returns true for toggling the button of cart
  isAddedtoCart = (product) => {
    const { cart } = this.props.products;

    let index = cart.indexOf(product);
    if (index == -1) {
      return false;
    }
    return true;
  };

  // this function is for adding editable inline link when we click on edit
  handleAddtoEditable = (product) => {
    this.props.dispatch(addtoEditable(product));
  };
  // this removes the product from editable
  handleRemovefromEditable = (product) => {
    this.props.dispatch(removefromEditable(product));
  };

  // it checks wheatcher there is product in editable list[] : if present return true and change the value
  isAddedtoEditable = (product) => {
    const { editable } = this.props.products;

    let index = editable.indexOf(product);
    if (index == -1) {
      return false;
    }
    return true;
  };

  // this is used to change the product when we edit inline
  handleChange = (fieldName, val, product) => {
    product[fieldName] = val;
  };

  //on submit the inline changed product it removes from editable and to list of new products
  submitEditChange = (product, index) => {
    this.props.dispatch(changeEditInline(product, index));
    notify("Edited Inline");
  };

  render() {
    const { products } = this.props;
    const { list, isCartProducts, cart } = products;
    // isCartProducts is true the display products would be cart items else products
    const displayProducts = isCartProducts ? cart : list;
    console.log("Products lists", products);

    return (
      <div className="product-lists">
        {/* if isCartProducts is true then it shows the Cart Item heading */}
        {isCartProducts ? <h1>Cart Items</h1> : null}
        {/* map all the products in cart item */}
        {displayProducts.map((product, index) => (
          <div className="cart-item" key={index}>
            <div className="left-block">
              <img style={Style.image} src={product.imgUrl} />
            </div>
            <div className="right-block">
              {/* checks if product is added to editable list accordingly edit options are avaialble */}
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
                {/* buttons for save the editable inline */}
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
