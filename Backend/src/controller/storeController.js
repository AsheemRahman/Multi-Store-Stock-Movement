import { STATUS_CODES } from "../constants/statusCode.js";
import { ERROR_MESSAGES } from "../constants/errorMessage.js";
import { SUCCESS_MESSAGES } from "../constants/successMessage.js";

import storeService from "../service/storeService.js";
import productService from "../service/productService.js";
import Stock from "../model/stockSchema.js";


class StoreController {
    async createStore(req, res) {
        try {
            const { name } = req.body;

            if (!name || !name.trim()) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT, });
            }
            const store = await storeService.createStore({ name: name.trim(), });

            const products = await productService.getAllProducts();
            const stockDocs = products.map(product => ({
                product: product._id,
                store: store._id,
                quantity: 0
            }));
            // Insert all stock documents
            if (stockDocs.length > 0) {
                await Stock.insertMany(stockDocs);
            }

            res.status(STATUS_CODES.CREATED).json({ status: true, message: SUCCESS_MESSAGES.DATA_RETRIEVED, store });
        } catch (error) {
            console.error(`Error occurred while creating store: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to create store", });
        }
    }

    async getStores(req, res) {
        try {
            const stores = await storeService.getAllStores();
            res.status(STATUS_CODES.OK).json({ status: true, message: SUCCESS_MESSAGES.DATA_RETRIEVED, stores });
        } catch (error) {
            console.error(`Error occurred while fetching stores: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch stores", });
        }
    }
}

export default new StoreController();