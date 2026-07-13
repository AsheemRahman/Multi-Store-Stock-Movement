import { STATUS_CODES } from "../constants/statusCode.js";
import { ERROR_MESSAGES } from "../constants/errorMessage.js";
import { SUCCESS_MESSAGES } from "../constants/successMessage.js";

import productService from "../service/productService.js";
import storeService from "../service/storeService.js";


class ProductController {
    async createProduct(req, res) {
        try {
            const { name, sku } = req.body;

            if (!name || !name.trim() || !sku || !sku.trim()) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT, });
            }

            const stores = await storeService.getAllStores();
            const stock = stores.map((s) => ({ store: s._id, quantity: 0 }));
            const product = await productService.createProduct({ name: name.trim(), sku: sku.trim(), stock });

            res.status(STATUS_CODES.CREATED).json({ status: true, message: SUCCESS_MESSAGES.DATA_RETRIEVED, product });
        } catch (error) {
            console.error(`Error occurred while creating product: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to create product", });
        }
    }

    async getProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(STATUS_CODES.OK).json({ status: true, message: SUCCESS_MESSAGES.DATA_RETRIEVED, products });
        } catch (error) {
            console.error(`Error occurred while fetching products: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to fetch products", });
        }
    }
}

export default new ProductController();