import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true, }
);

// Ensure one stock document per product per store
stockSchema.index({ product: 1, store: 1 }, { unique: true });

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;