import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['CreditCard', 'DebitCard', 'NetBanking', 'UPI'],
    required: true
  },
});

export default mongoose.model('Payment', paymentSchema);
