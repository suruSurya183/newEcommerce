import express from 'express';
import * as cartController from '../controllers/cart.controller.js';

const router = express.Router();

// add cart
router.post('/', cartController.insertCart);

// all carts
router.get('/', cartController.ListCarts);

/* show */
router.get('/:id', cartController.showCart);

/* update */
router.put('/:id', cartController.updateCart);

/* Delete */
router.delete('/:id', cartController.deleteCart);

/* Delete */
router.delete('/:cartId/product/:productId', cartController.deleteProduct);

export default router;
