import { RegisterOptions } from "react-hook-form";

const emailRegex = /\S+@\S+\.\S+/;
const fromRegex = /^(USD|INR)$/;
const amountRegex = /^[1-9]\d*$/;

export const emailValidation: RegisterOptions = {
    required: "Email is required",
    pattern: {
        value: emailRegex,
        message: "Email is invalid",
    },
};

export const fromValidation: RegisterOptions = {
    required: "From is required",
    pattern: {
        // value should be either USD or INR
        value: fromRegex,
        message: "From is invalid",
    },
};

export const amountValidation: RegisterOptions = {
    // amount should be positive and non zero
    required: "Amount is required",
    pattern: {
        value: amountRegex,
        message: "Amount should be positive and non zero",
    },
};

export const validateEmail = (email: string) => emailRegex.test(email);
export const validateFrom = (from: 'USD' | 'INR') => fromRegex.test(from);
export const validateAmount = (amount: string) => amountRegex.test(amount);