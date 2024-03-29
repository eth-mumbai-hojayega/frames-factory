import mongoose from "mongoose";

const Journey = new mongoose.Schema(
  {
    WalletAddress: String,
    ProductName: String,
    StartingNode: String,
    JourneyJson: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Journey || mongoose.model("Journey", Journey);

// {
//     nodes: [
//         {
//             "id": "1",
//             "type": "start",
//             "frame_id": ""
//         },
//     ],
// };
