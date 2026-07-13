import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true, }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;