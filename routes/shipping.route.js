import express from "express";
import * as shippingController from "../controllers/shipping.controller.js"

const  router = express.Router();

// POST Insert new shipping
router.post('/', shippingController.insertShipping);

// POST Update shipping BY id
router.put('/:id', shippingController.updateShipping);

// GET Single Show shipping BY id
router.get('/:id', shippingController.showShipping);

// GET All Show shipping
router.get('/', shippingController.showAllShipping);

// DELETE shipping BY id
router.delete('/:id', shippingController.deleteShipping);


export default router;