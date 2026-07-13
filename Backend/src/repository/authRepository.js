import User from "../../models/User.js";

class AuthRepository {
    async findByEmail(email) {
        return await User.findOne({
            email: email.toLowerCase(),
        });
    }

    async createUser(userData) {
        return await User.create(userData);
    }
}

export default new AuthRepository();