import User from "../model/authSchema.js";

class AuthRepository {
    async findByEmail(email) {
        return await Auth.findOne({
            email: email.toLowerCase(),
        });
    }

    async createUser(userData) {
        return await Auth.create(userData);
    }
}

export default new AuthRepository();