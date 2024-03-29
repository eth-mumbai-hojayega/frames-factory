import mongoose, { Document, Schema } from "mongoose";

// Define the FrameJson interface
export interface FrameJson {
  image: string;
  buttons: any[];
  textInput?: string;
  state?: string;
  imageOptions?: string;
}

// Define the FrameDocument interface extending Document
interface FrameDocument extends Document {
  name: string;
  frameJson: FrameJson;
}

// Define the Frame schema
const FrameSchema: Schema<FrameDocument> = new Schema<FrameDocument>(
  {
    name: String,
    frameJson: {
      type: {
        image: String,
        buttons: [mongoose.Schema.Types.Mixed], // Assuming buttons can be of any type
        textInput: { type: String, required: false },
        state: { type: String, required: false },
        imageOptions: { type: String, required: false },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Define and export the Frame model
const Frame = mongoose.models.Frame || mongoose.model<FrameDocument>("Frame", FrameSchema);

export default Frame;
