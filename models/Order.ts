import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user_id: mongoose.Types.ObjectId;
  products: { product_id: mongoose.Types.ObjectId; quantity: number }[];
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total_amount: number; // amount
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product_id: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
  total_amount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
