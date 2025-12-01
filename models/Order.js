import mongoose, { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
  total_amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Order || model("Order", OrderSchema);

