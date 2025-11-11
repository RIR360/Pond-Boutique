import { Schema, model, InferSchemaType } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
  category_id: { type: Schema.Types.ObjectId, ref: "Category" },
});

// Automatically infer the TypeScript type from the schema
export type Product = InferSchemaType<typeof ProductSchema>;

export default model<Product>("Product", ProductSchema);