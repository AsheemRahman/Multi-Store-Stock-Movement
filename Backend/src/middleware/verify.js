import jwt from 'jsonwebtoken';
import { STATUS_CODES } from "../constants/statusCode.js";
import { ERROR_MESSAGES } from "../constants/errorMessage.js";


export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization || '';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: ERROR_MESSAGES.TOKEN_NOT_FOUND });
        return;
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        req.user = { id: payload.id, role: payload.role, email: payload.email };
        return next();
    } catch (err) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Access token expired, please refresh or log in again." });
        return;
    }
}

export function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        res.status(STATUS_CODES.FORBIDDEN).json({ message: "Access denied: Admin privileges required." });
        return;
    }
    return next();
}
