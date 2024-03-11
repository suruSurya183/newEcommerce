import { deleteFileFromObjectStorage } from '../middlewares/bucket.js';
import RefundModel from '../models/refund.model.js';
import { validateCreateRefund, validateUpdateRefund } from '../validators/refund.validator.js';

// Insert New refund
export async function insertRefund(req, res) {
  try {
    const refundData = req.body;

    // Validate refund data before insertion
    const { error } = validateCreateRefund(refundData);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Refund with itemId
    const newRefund = new RefundModel(refundData);
    const savedRefund = await newRefund.save();

    // Send Response
    res.status(200).json({ message: "Refund data inserted", data: savedRefund });
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
export async function  ListRefunds(req, res, next){
  try {
    let refund = await RefundModel.find();
    if (!refund || refund.length === 0) {
      console.log('refund not found');
      return res.status(404).json({ message: 'refund not found' });
    }
    res.status(200).json({ message: "success", refund });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Display Single refund
export async function  showRefund(req, res, next){
  try {
    let id = req.params.id; // Assuming the parameter is refundId
    let refund = await RefundModel.findOne({_id: id});

    if (!refund) {
      console.log('Refund not found');
      return res.status(404).json({ message: 'Refund not found' });
    }

    res.status(200).json({ refund });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving refund' });
  }
};

// Update refund
export async function updateRefund(req, res, next) {
  try {
    const id = req.params.id;
    const refundDataToUpdate = req.body;

    // Validate the update data
    const { error } = validateUpdateRefund(refundDataToUpdate);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Get the existing refund by ID using Mongoose
    const existingRefund = await RefundModel.findOne({ _id: id });

    if (!existingRefund) {
      return res.status(404).json({ message: 'Refund not found' });
    }

    // Update only the fields that are present in the request body
    Object.assign(existingRefund, refundDataToUpdate);

    // Update photos if provided in the request
    if (req.files && req.files.photos) {
      existingRefund.photos.push(...req.files.photos.map(doc => doc.key));
    }

    // Save the updated refund
    const updatedRefund = await existingRefund.save();

    // Send the updated refund as JSON response
    res.status(200).json({ message: 'Refund updated successfully', refund: updatedRefund });
  } catch (error) {
    // Send Error Response
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

// Delete refund
export async function  deleteRefund(req, res, next){
  try {
    let id = req.params.id;
    console.log(id);

    const updatedRefund = await RefundModel.findByIdAndDelete(
      { _id: id },
      { new: true }
    );

    if (!updatedRefund) {
      return res.status(404).json({ message: "Refund not found." });
    }

    res.status(200).json({ message: "Refund deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
