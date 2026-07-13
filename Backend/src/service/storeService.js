import bcrypt from "bcryptjs";
import storeRepository from "../repository/storeRepository.js";

class StoreService {
    async getAllStores() {
        return await storeRepository.findAll();
    }

    async createStore(storeData) {
        return await storeRepository.createStore(storeData);
    }
}

export default new StoreService();