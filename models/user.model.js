import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema(
  {
    userName: { type: String, required: true },
    type: { type: String, enum: ['Super-Admin', 'Admin', 'Vendor', 'Customer', 'Staff'], default: 'Customer' },
    contactNumber: { type: Number },
    location: { type: String },
    emailAddress: { type: String, required: true },
    password: { type: String, required: true },
    disabled: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
