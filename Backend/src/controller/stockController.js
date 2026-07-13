import stockService from "../service/stockService.js";

class StockController {

    async getStocks(req, res) {
        try {
            const threshold = req.query.threshold;
            const stocks = await stockService.getStocks(threshold);
            res.json(stocks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async adjustStock(req, res) {
        try {
            const result = await stockService.adjustStock(req.body);
            res.json(result);
        } catch (err) {
            res.status(400).json({  message: err.message});
        }
    }

    async transferStock(req, res) {
        try {
            const result = await stockService.transferStock(req.body);
            res.json(result);
        } catch (err) {
            res.status(400).json({  message: err.message });
        }
    }

}

export default new StockController();