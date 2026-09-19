import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "boardId is required"],
      index: true, 
    },
    type: {
      type: String,
      enum: ["text", "image", "color"],
      required: [true, "Card type is required"],
    },
    content: {
      type: String,
      required: [true, "Card content is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
