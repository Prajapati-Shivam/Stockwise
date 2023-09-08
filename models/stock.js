import mongoose, { Schema, models } from "mongoose";

const stockSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Stock = models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;
