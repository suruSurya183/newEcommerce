import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: [true, "Please enter category_id"] },
  itemId: { type: String },
  itemName: { type: String },
  description: { type: String },
  price: { type: Number, default: 0 },
  photos: [],
  quantityInStock: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
}, {
  timestamps: true
});

export default mongoose.model("Product", productSchema);
