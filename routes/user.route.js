import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as authController from '../controllers/auth.controller.js';
// import SchemaValidator from "../middlewares/schemaValidator.js";
// const validateRequest = SchemaValidator(true);
const router = express.Router();

// Add user
// router.post('/userInsert', levelBasedLimit, userController.userInsert);
router.post('/', userController.userInsert);

// All users
router.get('/', userController.showAllUsers);

// Show user
router.get('/:id', userController.showUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

// Login user
router.post('/login', authController.userLogin);

// Logout user
router.post('/logout', authController.userLogout);

// Forget Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password
router.post('/change-password/:id', authController.changePassword);

// Search user
router.get('/users/search', userController.searchUser);

export default router;
