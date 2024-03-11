import CartModel from '../models/cart.model.js';
import { validateCreateCart, validateUpdateCart } from '../validators/cart.validator.js';

// Insert New cart
export async function insertCart(req, res) {
  try {
    const cartData = req.body;

    // Validate cart data before insertion
    const { error } = validateCreateCart(cartData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Cart with itemId
    const newCart = new CartModel(cartData);
    const savedCart = await newCart.save();

    // Send Response
    res.status(200).json({ message: "Cart data inserted", data: savedCart });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Something went wrong",
      });
  }
};

// Display List
export async function ListCarts(req, res, next){
  try {
    let cart = await CartModel.find();
    if (!cart || cart.length === 0) {
      console.log('cartr not found');
      return res.status(404).json({ message: 'cart not found' });
    }
    res.status(200).json({ message: "success", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single cart
export async function showCart(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is cartId
    let cart = await CartModel.findOne({_id: id});

    if (!cart) {
      console.log('Cart not found');
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving cart' });
  }
};

// Update cart
export async function updateCart(req, res, next) {
  try {
    const id = req.params.id;
    const cartDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateCart(cartDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing cart by ID using Mongoose
    const existingCart = await CartModel.findOne({ _id: id });

    if (!existingCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingCart, cartDataToUpdate);

    // Save the updated cart
    const updatedCart = await existingCart.save();

    // Send the updated cart as JSON response
    res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


// Delete cart
export async function deleteCart(req, res, next){
  try {
    let id = req.params.id;

    const deletedCart = await CartModel.findByIdAndDelete(id);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


// Delete cart
export async function deleteProduct(req, res, next){
  try {
    const cartId = req.params.cartId;
    console.log("cartId", cartId);
    const productId = req.params.productId;
    console.log("productId", productId);

    // Find the cart by ID
    const cart = await CartModel.findById(cartId);
    console.log("cart", cart);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Check if the product exists in the cart
    const productIndex = cart.items.findIndex(items => items.productId.toString() === productId);
    console.log("productIndex", productIndex);

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart." });
    }

    // Remove the product from the items array
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product deleted from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }

};

