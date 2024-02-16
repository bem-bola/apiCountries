import {Request, Response, NextFunction} from "express";
import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/config";
import { DataMinimaCountriesByLang, DataMinimaCountry } from "../interface/dataMinimaCountry";
import { ApiError } from "../errors/ApiError";
// import { LoggerError, LoggerInfo} from "../middlewares/logger";


/**
 * @swagger
 * tags:
 *  name: Country
 *  description: Récupération des données d'un pays ou d'un continent
 */
export class ApiRestCountrieController{
    /**
     * @swagger
     * /country/{country}:
     *   get: 
     *     summary: Récupère les données d'un pays
     *     description: 
     *     tags: [Country]
     *     parameters:
     *       - in: path
     *         name: country
     *         required: true
     *         description: nom du pays (en anglais)
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Retourne les données du pays renseigné
     *       500:
     *         description: Erreur lors de la récupération des données
     */

    public async getCountry(req: Request, res: Response, next: NextFunction) :Promise<void>{
        const country: string = req.params.country;
        const adressIp = req.ip;
        try{
            const response: AxiosResponse = await axios.get(
                `${API_BASE_URL}/name/${country}`
            );
            const dataMinimaCountry: DataMinimaCountry =
            { 
                name: response.data[0].name.common,
                fullname: response.data[0].name.official,
                capital:response.data[0].capital[0],
                languages: response.data[0].languages,
                currencies: response.data[0].currencies,
                continent: response.data[0].continents[0],
                maps: response.data[0].maps.googleMaps,
                flag: response.data[0].flags.png,
                population: response.data[0].population,
                area: response.data[0].area
            }
            
            // LoggerInfo.info(`Données recupérées par l'adresse IP : ${adressIp} !`);
            res.json(dataMinimaCountry);
        }catch(error: any){
            // recuperation message d'erreur
            res.json('Erreur lors de la récupération des données')
            next(new ApiError(error.stack))
        }
    }


       /**
         * @swagger
         * /countries/language/{lang}:
         *   post: 
         *     summary: Récupère les données des pays à partir d'une langue renseignée
         *     description: 
         *     tags: [Country]
         *     parameters:
         *       - in: path
         *         name: language
         *         required: true
         *         description: nom de la langue (en anglais)
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Retourne la liste de pays qui parlent la langue renseignée
         *       500:
         *         description: Erreur lors de la récupération des données
         */

    public async getCountriesByLang(req: Request, res: Response, next: NextFunction) :Promise<void>{
        const lang: string = req.params.lang;
        const adressIp = req.ip;
        try{
            const response: AxiosResponse = await axios.get(
                `${API_BASE_URL}/lang/${lang}`
            );
            // On map les données pour ne recuperer que celles dont on a besoin
            const dataMinimaCountriesByLang: DataMinimaCountriesByLang[] = response.data.map((
                item: { 
                    name: { common: string; official: string } ,
                    capital: string[],
                    flags: { png: string },
                    continents: string[]

                }) => ({
                name: item.name.common,
                fullname: item.name.official,
                capital: item.capital[0],
                flag: item.flags.png,
                continent: item.continents[0]
            }));

            // LoggerInfo.info(`Données recupérées par l'adresse IP : ${adressIp} !`);
            res.json(dataMinimaCountriesByLang);
        }catch(error: any){
            // recuperation message d'erreur
            res.json('Erreur lors de la récupération des données')
            next(new ApiError(error.stack))
        }
    }

    /**
     * @swagger
     * /countries/region/{region}:
     *   post: 
     *     summary: Récupère les données des pays à partir d'une region
     *     description: 
     *     tags: [Country]
     *     parameters:
     *       - in: path
     *         name: region
     *         required: true
     *         description: nom de la region (en anglais)
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Retourne la liste de pays qui parlent la region renseignée
     *       500:
     *         description: Erreur lors de la récupération des données
     */
public async getCountriesByContinent(req: Request, res: Response, next: NextFunction) :Promise<void>{
        const region: string = req.params.region;
        const adressIp = req.ip;
        try{
            const response: AxiosResponse = await axios.get(
                `${API_BASE_URL}/region/${region}`
            );
            // On map les données pour ne recuperer que celles dont on a besoin
            const dataMinimaCountriesByLang: DataMinimaCountriesByLang[] = response.data.map((
                item: { 
                    name: { common: string; official: string } ,
                    capital: string[],
                    flags: { png: string },
                    continents: string[]

                }) => ({
                name: item.name.common,
                fullname: item.name.official,
                capital: item.capital[0],
                flag: item.flags.png,
                continent: item.continents[0]
            }));

            // LoggerInfo.info(`Données recupérées par l'adresse IP : ${adressIp} !`);
            res.json(dataMinimaCountriesByLang);
        }catch(error: any){
            // recuperation message d'erreur
            res.status(500).json('Erreur lors de la récupération des données')
            next(new ApiError(error.stack))
        }
    }
}
