import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  order_id: mongoose.Types.ObjectId;
  amount: number;
  method: "bkash" | "cash";
  status: "success" | "failed" | "pending";
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: Number,
  method: { type: String, enum: ["bkash", "cash"], default: "bkash" },
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);
