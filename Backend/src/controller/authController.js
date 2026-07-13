import { Request, Response } from "express";
import { STATUS_CODES } from "../../../constants/statusCode";
import { ERROR_MESSAGES } from "../../../constants/errorMessage"
import { SUCCESS_MESSAGES } from "../../../constants/successMessage"
import JwtUtility, { TokenPayload } from "../../../utils/JwtUtility";

import authService from "../../../service/user/IUserService";
import { JwtPayload } from "jsonwebtoken";


async function register(req, res, next) {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT });
            return;
        }
        if (password.length < 6) {
            // throw new AppError('password must be at least 6 characters', 400, 'VALIDATION_ERROR');
            res.status(STATUS_CODES.CONFLICT).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_EXIST });
            return;
        }
        // Check if email already exists
        const isEmailUsed = await authService.findUser(email);
        if (isEmailUsed) {
            res.status(STATUS_CODES.CONFLICT).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_EXIST });
            return;
        }

        const finalRole = role === 'admin' ? 'admin' : 'shopper';

        const passwordHash = await authService.hashPassword(password);
        const currentUser = await authService.createUser({ email, passwordHash, role: finalRole });

        const payload = { userId: (currentUser.id).toString(), role: currentUser.role };
        const accessToken = JwtUtility.generateAccessToken(payload);
        res.status(STATUS_CODES.CREATED).json({
            status: true,
            message: SUCCESS_MESSAGES.REGISTER,
            data: {
                accessToken,
                user: {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name,
                    role: currentUser.role
                }
            }
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(STATUS_CODES.BAD_REQUEST).json({ status: false, message: ERROR_MESSAGES.INVALID_INPUT });
            return;
        }

        const currentUser = await User.findOne({ email: email.toLowerCase() });
        if (!currentUser) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ status: false, message: ERROR_MESSAGES.INVALID_CREDENTIALS });
            return;
        }

        const ok = await currentUser.comparePassword(password);
        if (!ok) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ status: false, message: ERROR_MESSAGES.INVALID_CREDENTIALS });
            return;
        }

        const payload = { userId: (currentUser.id).toString(), role: currentUser.role };
        const accessToken = JwtUtility.generateAccessToken(payload);

        const token = signToken(currentUser);
        res.status(STATUS_CODES.OK).json({ status: true, message: SUCCESS_MESSAGES.LOGIN, data: { accessToken, user: { id: currentUser._id, email: currentUser.email, name: currentUser.name, role: currentUser.role } } });
    } catch (error) {
        console.error('error while login:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ status: false, message: 'Failed to login', });
    }
}

module.exports = { register, login };
