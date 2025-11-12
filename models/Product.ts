import { Schema, model, models, InferSchemaType, Types } from "mongoose";

const ProductSchema = new Schema({
  _id: Types.ObjectId,
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  image_url: { type: String, required: true },
  category: String,
});

export type Product = InferSchemaType<typeof ProductSchema>;

// Prevent OverwriteModelError
export default models.Product || model<Product>("Product", ProductSchema);