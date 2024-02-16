import express, {Request, Response} from "express";
import { PORT } from "./constants/config";
import { ApiRestCountrieController } from './controllers/apiRestCountrieController';
import { NextFunction } from 'express';
import { errorHandler } from "./middlewares/errorHandlers";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swaggerOptions";
import { logger } from "./middlewares/logger";

const app = express();
const apiRestCountrieController = new ApiRestCountrieController ()

// La route qui permet de récupérer les données d'un pays
app.get("/country/:country", async (req: Request, res: Response, next: NextFunction) => {
    await apiRestCountrieController.getCountry(req, res, next);
})

// La route qui permet de recuperer les pays parlant une langue
app.post("/countries/language/:lang", async (req: Request, res: Response, next: NextFunction) => {
    await apiRestCountrieController.getCountriesByLang(req, res, next);
})

app.post("/countries/region/:region", async (req: Request, res: Response, next: NextFunction) => {
    await apiRestCountrieController.getCountriesByContinent(req, res, next);
})

const specs = swaggerJSDoc(swaggerOptions);
// Documentation de l'api
app.use("/api_doc", swaggerUi.serve, swaggerUi.setup(specs))

app.use(errorHandler);
app.use(logger);

app.listen(PORT, ()=>{
    console.log(`Le serveur est en cours d'éxécution sur le port ${PORT}`)
})