export class CustomError extends Error {
    constructor(message: string, errorCode:number){
        super(message);
        this.name = "CustomError";
        this.errorCode = errorCode;
    }

    errorCode: number;
}