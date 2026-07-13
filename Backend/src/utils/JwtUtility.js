import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET_KEY;

class JwtUtility {
    static generateAccessToken(payload) {
        return jwt.sign(payload, accessSecret, { expiresIn: "15m", });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, refreshSecret, { expiresIn: "7d", });
    }

    static verifyToken(token, isRefresh = false) {
        const secret = isRefresh ? refreshSecret : accessSecret;
        return jwt.verify(token, secret);
    }
}

export default JwtUtility;