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
  
  content: [
    {
      fileName: { type: String, required: true }, 
      code: { type: String, required: true }      
    },
  ],
  isremote:{
       type:Boolean ,
       default:null 
  },
  visibility: {
    type: Boolean, 
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