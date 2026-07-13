import bcrypt from "bcryptjs";

class PasswordUtils {
    static async passwordHash(password) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }

    static async comparePassword(userPassword, dbPassword) {
        return await bcrypt.compare(userPassword, dbPassword);
    }
}

export default PasswordUtils;