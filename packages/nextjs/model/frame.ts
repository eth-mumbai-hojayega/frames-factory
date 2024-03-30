import { Frame } from "frames.js";
import mongoose, { Document, Schema } from "mongoose";

// Define the FrameJson interface

// Define the FrameDocument interface extending Document
interface FrameDocument extends Document {
  name: string;
  frameJson: Frame;
}

// Define the Frame schema
const FrameSchema: Schema<FrameDocument> = new Schema<FrameDocument>(
  {
    name: String,
    frameJson: Object as any as Frame,
  },
  {
    timestamps: true,
  },
);

// Define and export the Frame model
const Frame = mongoose.models.Frame || mongoose.model<FrameDocument>("Frame", FrameSchema);

export default Frame;
