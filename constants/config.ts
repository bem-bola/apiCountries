import exp = require("constants");
import dotenv from "dotenv";
dotenv.config();

export const API_BASE_URL: string = "https://restcountries.com/v3.1";
export const PORT : number        = process.env.PORT ? parseInt(process.env.PORT) : 3000;
