import stockService from "../service/stockService.js";
import { STATUS_CODES } from "../constants/statusCode.js";

class StockController {

    async getStocks(req, res) {
        try {
            const threshold = req.query.threshold;
            const stocks = await stockService.getStocks(threshold);
            res.json(stocks);
        } catch (err) {
            console.error(`Error occurred while fetching stocks: ${err}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    }

    async adjustStock(req, res) {
        try {
            const { productId, storeId, change } = req.body;

            if (!productId || !storeId || change === undefined) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Missing required fields." });
            }

            const parsedChange = parseInt(change, 10);
            if (isNaN(parsedChange)) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Change must be a valid number." });
            }

            const adjustmentData = { productId, storeId, change: parsedChange };
            const result = await stockService.adjustStock(adjustmentData);
            res.json(result);
        } catch (err) {
            console.error(`Error occurred while adjusting stock: ${err}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    }

    async transferStock(req, res) {
        try {
            const { productId, fromStoreId, toStoreId, quantity } = req.body;

            if (!productId || !fromStoreId || !toStoreId || quantity === undefined) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Missing required fields." });
            }

            const parsedQuantity = parseInt(quantity, 10);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Quantity must be a positive number." });
            }

            const transferData = { productId, fromStoreId, toStoreId, quantity: parsedQuantity };
            const result = await stockService.transferStock(transferData);
            res.json(result);
        } catch (err) {
            console.error(`Error occurred while transferring stock: ${err}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: err.message });
        }
    }

}

export default new StockController();