import stockService from "../service/stockService.js";

class StockController {

    async getStocks(req, res) {
        try {
            const threshold = req.query.threshold;
            const stocks = await stockService.getStocks(threshold);
            res.json(stocks);
        } catch (err) {
            console.error(`Error occurred while fetching stocks: ${err}`);
            res.status(500).json({ message: err.message });
        }
    }

    async adjustStock(req, res) {
        try {
            const { productId, storeId, change } = req.body;

            if (!productId || !storeId || change === undefined) {
                return res.status(400).json({ message: "Missing required fields." });
            }

            const parsedChange = parseInt(change, 10);
            if (isNaN(parsedChange)) {
                return res.status(400).json({ message: "Change must be a valid number." });
            }

            const adjustmentData = { productId, storeId, change: parsedChange };
            const result = await stockService.adjustStock(adjustmentData);
            res.json(result);
        } catch (err) {
            console.error(`Error occurred while adjusting stock: ${err}`);
            res.status(400).json({ message: err.message });
        }
    }

    async transferStock(req, res) {
        try {
            const result = await stockService.transferStock(req.body);
            res.json(result);
        } catch (err) {
            console.error(`Error occurred while transferring stock: ${err}`);
            res.status(400).json({  message: err.message });
        }
    }

}

export default new StockController();