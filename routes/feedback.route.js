import express from 'express';
import * as feedbackController from '../controllers/feedback.controller.js';

const router = express.Router();

// add feedback
router.post('/', feedbackController.insertFeedback);

// all feedbacks
router.get('/', feedbackController.ListFeedbacks);

/* show */
router.get('/:id', feedbackController.showFeedback);

/* update */
router.put('/:id', feedbackController.updateFeedback);

/* Delete */
router.delete('/:id', feedbackController.deleteFeedback);

export default router;
