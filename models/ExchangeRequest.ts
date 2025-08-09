import mongoose, { Schema, Document } from "mongoose";

export interface IExchangeRequest extends Document {
  user_id: mongoose.Types.ObjectId;
  order_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
}

const ExchangeRequestSchema = new Schema<IExchangeRequest>({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  order_id: { type: Schema.Types.ObjectId, ref: "Order" },
  product_id: { type: Schema.Types.ObjectId, ref: "Product" },
  reason: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

export default mongoose.models.ExchangeRequest ||
  mongoose.model<IExchangeRequest>("ExchangeRequest", ExchangeRequestSchema);
