import express from "express";
const router = express.Router();
import * as trackingController from "../controllers/tracking.controller.js"

// POST Insert new tracking
router.post('/', trackingController.insertTracking);

// PUT Update  tracking
router.put('/:id', trackingController.updateTracking);

// GET Single Show Tracking BY id
router.get('/:id', trackingController.showTracking);

// GET All Show Tracking 
router.get('/', trackingController.showAllTracking);


// DELETE  Tracking BY ID
router.delete('/:id', trackingController.deleteTracking);



export default router;