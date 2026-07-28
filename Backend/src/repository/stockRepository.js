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
            stock = await Stock.findOneAndUpdate(
                {
                    product: productId,
                    store: storeId
                },
                {
                    $inc: {
                        quantity: change
                    }
                },
                {
                    upsert: true,
                    setDefaultsOnInsert: true,
                    returnDocument: "after",
                }
            );
        } else {
            stock = await Stock.findOneAndUpdate(
                {
                    product: productId,
                    store: storeId,
                    quantity: {
                        $gte: Math.abs(change)
                    }
                },
                {
                    $inc: {
                        quantity: change
                    }
                },
                {
                    returnDocument: "after"
                }
            );

            if (!stock) {
                throw new Error("Insufficient stock.");
            }
        }

        return stock;
    }

    async transferStock({ productId, fromStoreId, toStoreId, quantity }) {

        if (quantity <= 0) {
            throw new Error("Quantity must be positive.");
        }

        if (fromStoreId === toStoreId) {
            throw new Error("Stores cannot be the same.");
        }

        const session = await mongoose.startSession();
        let result;
        try {
            await session.withTransaction(async () => {
                const source = await Stock.findOneAndUpdate(
                    {
                        product: productId,
                        store: fromStoreId,
                        quantity: { $gte: quantity }
                    }, { $inc: { quantity: -quantity } }, { returnDocument: "after", session }
                );

                if (!source) {
                    throw new Error("Insufficient quantity or stock does not exist.");
                }

                const destination = await Stock.findOneAndUpdate(
                    { product: productId, store: toStoreId }, { $inc: { quantity: quantity } },
                    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true, session }
                );
                result = { source, destination };
            });
        } catch (error) {
            console.error(`Error occurred during stock transfer: ${error}`);
            throw error;
        } finally {
            session.endSession();
        }
        return result;
    }

}

export default new StockRepository();