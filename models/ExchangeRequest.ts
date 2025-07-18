import mongoose, { Schema, Document } from "mongoose";

export interface IExchangeRequest extends Document {
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const ExchangeRequestSchema = new Schema<IExchangeRequest>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  order: { type: Schema.Types.ObjectId, ref: "Order" },
  reason: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ExchangeRequest ||
  mongoose.model<IExchangeRequest>("ExchangeRequest", ExchangeRequestSchema);
