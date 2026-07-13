import stockRepository from "../repository/stockRepository.js";

class StockService {

    async getStocks(threshold) {
        return stockRepository.getStocks(threshold);
    }

    async adjustStock(data) {
        return stockRepository.adjustStock(data);
    }

    async transferStock(data) {
        return stockRepository.transferStock(data);
    }

}

export default new StockService();