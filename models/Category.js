import mongoose, { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
});

export default mongoose.models.Category || model("Category", CategorySchema);

