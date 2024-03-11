import express from 'express';
import * as refundController from '../controllers/refund.controller.js';

const router = express.Router();

// add refund
router.post('/', refundController.insertRefund);

// all refunds
router.get('/', refundController.ListRefunds);

/* show */
router.get('/:id', refundController.showRefund);

/* update */
router.put('/:id', refundController.updateRefund);

/* Delete */
router.delete('/:id', refundController.deleteRefund);

export default router;
