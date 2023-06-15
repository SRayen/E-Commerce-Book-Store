import mongoose from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLengh: 32,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);
