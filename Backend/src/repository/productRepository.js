import Product from "../model/productSchema.js";

class ProductRepository {
    async findAllProducts() {
        return await Product.find();
    }

    async createProduct(productData) {
        return await Product.create(productData);
    }
}

export default new ProductRepository();