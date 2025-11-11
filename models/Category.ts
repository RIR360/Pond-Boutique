import { Schema, model, InferSchemaType } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
});

// Infer the TS type directly from the schema
export type Category = InferSchemaType<typeof CategorySchema>;

export default model<Category>("Category", CategorySchema);
