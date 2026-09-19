import mongoose from "mongoose";

// A Board is a collection of creative cards (like a Pinterest board).
const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Board title is required"],
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
