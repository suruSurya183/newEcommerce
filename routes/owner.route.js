import express from 'express';
import * as ownerController from '../controllers/owner.controller.js';
import * as authController from '../controllers/authOwner.controller.js';
// import SchemaValidator from "../middlewares/schemaValidator.js";
// const validateRequest = SchemaValidator(true);
const router = express.Router();

// Add owner
// router.post('/ownerInsert', levelBasedLimit, ownerController.ownerInsert);
router.post('/', ownerController.ownerInsert);

// All owners
router.get('/', ownerController.showAllOwners);

// Show owner
router.get('/:id', ownerController.showOwner);

// Update owner
router.put('/:id', ownerController.updateOwner);

// Delete owner
router.delete('/:id', ownerController.deleteOwner);

// Login owner
router.post('/login', authController.ownerLogin);

// Logout owner
router.post('/logout', authController.ownerLogout);

// Forget Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password
router.post('/change-password/:id', authController.changePassword);

// Search owner
router.get('/owners/search', ownerController.searchOwner);

export default router;
