import { STATUS_CODES } from "../constants/statusCode.js";
import { ERROR_MESSAGES } from "../constants/errorMessage.js";
import { SUCCESS_MESSAGES } from "../constants/successMessage.js";

import storeService from "../service/storeService.js";


class StoreController {
    async createStore(req, res) {
        try {
            const { name, location } = req.body;

            // if (!name || !name.trim() || !location || !location.trim()) {
            //     return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT, });
            // }
            // const store = await storeService.createStore({ name: name.trim(), location: location.trim() });
            if (!name || !name.trim() ) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT, });
            }
            const store = await storeService.createStore({ name: name.trim(), });


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