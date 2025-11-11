import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Auto-generate TS type from schema
export type User = InferSchemaType<typeof UserSchema>;

// Safe model export (works in Next.js / hot reload)
export default model<User>("User", UserSchema);