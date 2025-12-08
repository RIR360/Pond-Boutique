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
  payment_method: { type: String, enum: ["online", "cod"], default: "cod" },
  payment_status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  shipping_status: { type: String, enum: ["processing", "shipped", "delivered"], default: "processing" },
  note: { type: String, default: "" },
  shipping: {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Order || model("Order", OrderSchema);

