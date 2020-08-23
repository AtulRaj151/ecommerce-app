import React, { Component } from "react";
import { appendProduct, hideAddProduct } from "../actions/products";

class AddProduct extends Component {
  handleaddProduct = (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let imgUrl = document.getElementById("image").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let product = {
      count: 0,
      description,
      imgUrl,
      name,
      price,
    };

    this.props.dispatch(appendProduct(product));
    this.props.dispatch(hideAddProduct(false));
  };
  handleCloseDialogueBox = (val) => {
    this.props.dispatch(hideAddProduct(val));
  };
  render() {
    return (
      <div className="add-product-container">
        <p>ADD PRODUCT</p>
        <div
          onClick={() => this.handleCloseDialogueBox(false)}
          className="add-product-close"
        >
          <img src="https://image.flaticon.com/icons/svg/753/753345.svg" />
        </div>
        <form className="add-product-form">
          <label className="add-product-label">Name</label>
          <input
            type="text"
            id="name"
            className="add-product-input"
            name="name"
            placeholder="Name of the Product.."
          />
          <label className="add-product-label">Image</label>
          <input
            type="text"
            className="add-product-input"
            id="image"
            name="image"
            placeholder="Images address."
          />
          <label className="add-product-label">Description</label>

          <input
            type="text"
            className="add-product-input"
            id="description"
            name="description"
            placeholder="Description.."
          />
          <label className="add-product-label">Price</label>
          <input
            type="number"
            className="add-product-input"
            id="price"
            name="price"
            placeholder="Price in Rs.."
          />
          <button
            onClick={this.handleaddProduct}
            className="add-product-btn"
            value="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    );
  }
}

export default AddProduct;
