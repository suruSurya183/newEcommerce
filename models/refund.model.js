import mongoose from "mongoose";

const { Schema } = mongoose;

const refundSchema = Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  refundedAmount: { type: Number, required: true },
  refundReason: { type: String },
  refundStatus: { type: String, enum: ['Requested', 'Processing', 'Completed', 'Cancelled'], default: 'Requested' }
}, {
  timestamps: true
});

export default mongoose.model("Refund", refundSchema);
