import mongoose from "mongoose";

// A Card belongs to a Board and can be one of three types:
// text (a note), image (an image URL), or color (a hex/color value).
const cardSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "boardId is required"],
      index: true, // speeds up "get all cards for this board" queries
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
