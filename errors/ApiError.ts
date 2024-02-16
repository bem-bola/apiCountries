import { API_REST_COUNTRIES_ERROR } from "../constants/errorCodes";
import { CustomError } from "./CustomError";

export class ApiError extends CustomError {
    constructor(message: string, debugInfo?: any){
        super(message, API_REST_COUNTRIES_ERROR);
        this.name = "ApiError";
        Error.captureStackTrace(this, CustomError);
    }
}