import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    maxlength: 100
  },
  cardNumber: {
    type: String,
    required: true,
    maxlength: 20
  },
  cardOwnerName: {
    type: String,
    required: true,
    maxlength: 255
  },
  expireDate: {
    type: Date,
    required: true
  },
  CVC: {
    type: String,
    required: true,
    maxlength: 20
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;
