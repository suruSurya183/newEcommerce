import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = Schema({
  userId: { type: String, ref: 'User', required: true },
  items: [ { productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, quantity: { type: Number, required: true } } ],
  totalPrice: { type: mongoose.Types.Decimal128, required: true },
  shippingAddress: { type: String, maxlength: 150 },
  billingAddress: { type: String, maxlength: 200 },
  discount: { type: Number },
  deliveryFee: { type: Number },
  tax: { type: Number },
  bookingStatus: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' }
},
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
