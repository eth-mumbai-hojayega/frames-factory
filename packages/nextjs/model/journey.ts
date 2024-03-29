import mongoose from "mongoose";

const Journey = new mongoose.Schema(
  {
    walletAddress: String,
    name: String,
    journeyJson: String,
    desc: String,
    image: String,
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
