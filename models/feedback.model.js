import mongoose from "mongoose";

const { Schema } = mongoose;

const feedbackSchema = Schema({
  userName: { type: String, maxlength: 200 },
  emailAddress: { type: String, maxlength: 100 },
  comment: { type: String }
}, {
  timestamps: true
});

export default mongoose.model("Feedback", feedbackSchema);
