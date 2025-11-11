import mongoose, { Schema, InferSchemaType } from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Use InferSchemaType to automatically infer the TypeScript type
export type IAdmin = InferSchemaType<typeof AdminSchema>;

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
