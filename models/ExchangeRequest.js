import mongoose, { Schema, model } from "mongoose";

const ExchangeRequestSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },
    dueDate: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.ExchangeRequest || model("ExchangeRequest", ExchangeRequestSchema);

