import { STATUS_CODES } from "../constants/statusCode.js";
import { ERROR_MESSAGES } from "../constants/errorMessage.js";
import { SUCCESS_MESSAGES } from "../constants/successMessage.js";

import authService from "../service/authService.js";
import JwtUtility from "../utils/JwtUtility.js";


class AuthController {
    async register(req, res) {
        try {
            const { email, password, role } = req.body;

            if (!email || !password) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: ERROR_MESSAGES.INVALID_INPUT, });
            }

            const user = await authService.register(email, password, role === "admin" ? "admin" : "shopper");
            const token = JwtUtility.generateAccessToken({ id: user._id.toString(), role: user.role, });

            res.status(STATUS_CODES.CREATED).json({
                status: true,
                message: SUCCESS_MESSAGES.REGISTER,
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                },
            });

        } catch (error) {

            if (error.message === "EMAIL_ALREADY_EXISTS") {
                return res.status(STATUS_CODES.CONFLICT).json({
                    message: ERROR_MESSAGES.EMAIL_ALREADY_EXIST,
                });
            }
            console.error(`Error occurred while logging in: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to register", });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    message: ERROR_MESSAGES.INVALID_INPUT,
                });
            }

            const user = await authService.login(email, password);
            const token = JwtUtility.generateAccessToken({ id: user._id.toString(), role: user.role, });

            res.status(STATUS_CODES.OK).json({
                status: true,
                message: SUCCESS_MESSAGES.LOGIN,
                data: {
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                },
            });

        } catch (error) {
            if (error.message === "INVALID_CREDENTIALS") {
                return res.status(STATUS_CODES.UNAUTHORIZED).json({
                    message: ERROR_MESSAGES.INVALID_CREDENTIALS,
                });
            }
            console.error(`Error occurred while logging in: ${error}`);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Failed to login", });
        }
    }
}

export default new AuthController();