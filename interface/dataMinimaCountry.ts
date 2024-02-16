interface DataMinimaCountry {
    name: string,
    fullname: string,
    capital: string,
    languages: object,
    currencies: object,
    continent: string,
    maps: string,
    flag: string,
    population: number,
    area: number
};

interface DataMinimaCountriesByLang {
    name: string,
    fullname: string,
    capital: string,
    flag: string,
    continent: string
}



export {DataMinimaCountry, DataMinimaCountriesByLang}