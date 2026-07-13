import mongoose, { Schema } from "mongoose";

const stockEntrySchema = new mongoose.Schema(
    {
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
    },
    { _id: false }
);

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: [stockEntrySchema],
        default: [],
    },
}, { timestamps: true, }
);

const Product = mongoose.model("Product", productSchema);

export default Product;