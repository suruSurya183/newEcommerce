import express from 'express';
import * as orderController from '../controllers/order.controller.js';

const router = express.Router();

// add order
router.post('/', orderController.insertOrder);

// all orders
router.get('/', orderController.ListOrders);

/* show */
router.get('/:id', orderController.showOrder);

/* update */
router.put('/:id', orderController.updateOrder);

/* Delete */
router.delete('/:id', orderController.deleteOrder);

export default router;
