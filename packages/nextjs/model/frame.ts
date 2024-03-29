import mongoose from "mongoose";

const Frame = new mongoose.Schema({
    name: String,
    frameJson: String,
},
{
    timestamps: true,
});

export default mongoose.models.Frame || mongoose.model("Frame", Frame);