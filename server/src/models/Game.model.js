import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    levelResults: [
      {
        level: Number,
        result: String, // "win", "lose", "draw"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Game", gameSchema);
