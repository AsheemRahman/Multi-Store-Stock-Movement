import mongoose from "mongoose";
import Stock from "../model/stockSchema.js";

class StockRepository {

    async getStocks(threshold) {
        const filter = {};
        if (threshold !== undefined) {
            filter.quantity = { $lte: Number(threshold) };
        }
        return await Stock.find(filter).populate("product").populate("store");
    }

    async adjustStock({ productId, storeId, change }) {
        if (change === 0) {
            throw new Error("Invalid adjustment.");
        }

        let stock;
        if (change > 0) {
            stock = await Stock.findOneAndUpdate({ product: productId, store: storeId }, { $inc: { quantity: change } }, { new: true });
        }

        else {

            stock = await Stock.findOneAndUpdate(
                { product: productId, store: storeId, quantity: { $gte: Math.abs(change) }}, {  $inc: {  quantity: change }}, { new: true }
            );

            if (!stock) {
                throw new Error("Insufficient stock.");
            }
        }
        return stock;
    }

    async transferStock({ productId, sourceStoreId, destinationStoreId, quantity}) {

        if (quantity <= 0) {
            throw new Error("Quantity must be positive.");
        }

        if (sourceStoreId === destinationStoreId) {
            throw new Error("Stores cannot be the same.");
        }

        const session = await mongoose.startSession();
        let result;
        try {
            await session.withTransaction(async () => {
                const source = await Stock.findOneAndUpdate(
                    {
                        product: productId,
                        store: sourceStoreId,
                        quantity: { $gte: quantity}
                    },  { $inc: {  quantity: -quantity }}, {  new: true, session}
                );

                if (!source) {
                    throw new Error("Insufficient stock.");
                }

                const destination = await Stock.findOneAndUpdate(
                    { product: productId, store: destinationStoreId}, { $inc: { quantity: quantity }}, {  new: true, session}
                );
                result = { source, destination};
            });

        } finally {
            session.endSession();
        }
        return result;
    }

}

export default new StockRepository();