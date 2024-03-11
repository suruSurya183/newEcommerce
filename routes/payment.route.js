import express from "express";
const router = express.Router();
import * as paymetController from "../controllers/payment.controller.js"


// Define route for creating a new paymet
router.post('/signup', paymetController.paymentInsert);

// PUT request to update a payment by ID
router.put('/update/:id',paymetController.updatePayment);


// Define route for showing a specific paymet
router.get('/show/:id', paymetController. showPayment);

// Define route for paymet all categories
router.get('/all', paymetController.showAllPayment);

// DELETE request to delete a payment by ID
router.delete('/delete/:id', paymetController.deletePayment);

export default router;