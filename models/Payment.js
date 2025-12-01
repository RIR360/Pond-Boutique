import mongoose, { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["bkash", "cash"], default: "bkash" },
  status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Payment || model("Payment", PaymentSchema);

