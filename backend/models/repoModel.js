import mongoose from "mongoose";
import { Schema } from "mongoose";

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  // ✅ Content stores the actual code
  content: [
    {
      fileName: { type: String, required: true }, // e.g. "index.html"
      code: { type: String, required: true }      // e.g. "<h1>Hello</h1>"
    },
  ],
  visibility: {
    type: Boolean, // true = public, false = private
    default: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
}, {
  timestamps: true,
});

const Repository = mongoose.model("Repository", RepositorySchema);
export default Repository;