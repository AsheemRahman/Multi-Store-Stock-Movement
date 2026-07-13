import mongoose, { Schema } from "mongoose";


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
}, { timestamps: true, }
);

const Product = mongoose.model("Product", productSchema);

export default Product;