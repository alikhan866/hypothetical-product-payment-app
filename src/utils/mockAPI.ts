import { validateEmail, validateFrom, validateAmount } from ".";

export interface submitFormData {
    to: string;
    from: 'USD' | 'INR';
    amount: string;
    description?: string
}

export interface mockApiResponse {
    message: string;
    status?: number;
}

export const mockApiResponse = (data: submitFormData, is401?: boolean): Promise<mockApiResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(is401) {
                reject({ status: 401, message: "Unauthorized" });
            }
            if (!validateEmail(data.to)) {
                reject({ status: 400, message: "Email is invalid" });
            } else if (!validateFrom(data.from)) {
                reject({ status: 400, message: "From is invalid" });
            } else if (!validateAmount(data.amount)) {
                reject({ status: 400, message: "Amount should be positive and non zero" });
            } else {
                resolve({ message: 'Success' });
            }
            reject({ status: 500, message: "Internal Server Error" });
        }, 1000);
    });
};