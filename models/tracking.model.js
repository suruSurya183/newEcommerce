import mongoose from 'mongoose';

const { Schema } = mongoose;

const trackingSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  status: { type: String, enum: ['pending', 'in-transit', 'out-for-delivery', 'delivered'], default:"pending" },
  location: { type: String, maxlength: 150 },
  estimatedDeliveryDate: { type: Date }
  // Other fields as per requirement
}, {
  timestamps: true
});

const Tracking = mongoose.model('Tracking', trackingSchema);

export default Tracking;
