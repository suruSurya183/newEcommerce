import mongoose from 'mongoose';

const { Schema } = mongoose;

const shippingSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  estimatedDeliveryTime: { type: Number, required: true } // in days
  // Other fields as per requirement
}, {
  timestamps: true
});

const Shipping = mongoose.model('Shipping', shippingSchema);

export default Shipping;
