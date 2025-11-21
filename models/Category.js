import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
});

export default model("Category", CategorySchema);

