import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['shopper', 'admin'],
            required: true,
        },
    }, { timestamps: true, }
);

const Auth = mongoose.model("Auth", userSchema);

export default Auth;