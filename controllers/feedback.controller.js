import { deleteFileFromObjectStorage } from '../middlewares/bucket.js';
import FeedbackModel from '../models/feedback.model.js';
import { validateCreateFeedback, validateUpdateFeedback } from '../validators/feedback.validator.js';

// Insert New feedback
export async function insertFeedback(req, res) {
  try {
    const feedbackData = req.body;

    // Validate feedback data before insertion
    const { error } = validateCreateFeedback(feedbackData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Feedback with itemId
    const newFeedback = new FeedbackModel(feedbackData);
    const savedFeedback = await newFeedback.save();

    // Send Response
    res.status(200).json({ message: "Feedback data inserted", data: savedFeedback });
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
export async function  ListFeedbacks(req, res, next){
  try {
    let feedback = await FeedbackModel.find();
    if (!feedback || feedback.length === 0) {
      console.log('feedback not found');
      return res.status(404).json({ message: 'feedback not found' });
    }
    res.status(200).json({ message: "success", feedback });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single feedback
export async function  showFeedback(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is feedbackId
    let feedback = await FeedbackModel.findOne({_id: id});

    if (!feedback) {
      console.log('Feedback not found');
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving feedback' });
  }
};

// Update feedback
export async function updateFeedback(req, res, next) {
  try {
    const id = req.params.id;
    const feedbackDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateFeedback(feedbackDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing feedback by ID using Mongoose
    const existingFeedback = await FeedbackModel.findOne({ _id: id });

    if (!existingFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingFeedback, feedbackDataToUpdate);

    // Update photos if provided in the request
    if (req.files && req.files.photos) {
      existingFeedback.photos.push(...req.files.photos.map(doc => doc.key));
    }

    // Save the updated feedback
    const updatedFeedback = await existingFeedback.save();

    // Send the updated feedback as JSON response
    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete feedback
export async function  deleteFeedback(req, res, next){
  try {
    let id = req.params.id;
    console.log(id);

    const updatedFeedback = await FeedbackModel.findByIdAndDelete(
      { _id: id },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found." });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
