import bcrypt from "bcryptjs";
import productRepository from "../repository/productRepository.js";

class ProductService {
    async createProduct(productData) {
        return await productRepository.createProduct(productData);
    }

    async getAllProducts() {
        return await productRepository.findAllProducts();
    }

}

export default new ProductService();