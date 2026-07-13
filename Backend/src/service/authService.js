import bcrypt from "bcryptjs";
import authRepository from "../repository/authRepository.js";

class AuthService {
    async register(email, password, role) {
        const existingUser = await authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await authRepository.createUser({ email: email.toLowerCase(), password: hashedPassword, role,});
        return user;
    }

    async login(email, password) {
        const user = await authRepository.findByEmail(email);

        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("INVALID_CREDENTIALS");
        }

        return user;
    }
}

export default new AuthService();