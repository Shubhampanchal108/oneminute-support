import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    organization_id: {
      type: String,
      required: true,
    },
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
