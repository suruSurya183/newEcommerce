import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Assuming your product schema is named 'Product'
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming your user schema is named 'User'
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
