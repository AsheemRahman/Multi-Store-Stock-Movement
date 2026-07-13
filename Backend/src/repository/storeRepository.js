import Store from "../model/storeSchema.js";

class StoreRepository {
    async findAll() {
        return await Store.find();
    }

    async createStore(storeData) {
        return await Store.create(storeData);
    }
}

export default new StoreRepository();