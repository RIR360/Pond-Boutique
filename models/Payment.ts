import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  amount: number;
  method: "card" | "bkash" | "nagad" | "cash";
  status: "success" | "failed" | "pending";
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: Number,
  method: { type: String, enum: ["card", "bkash", "nagad", "cash"], default: "card" },
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
