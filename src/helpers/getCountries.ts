import { countriesApi } from "../api";
import { Countries } from "../interfaces";

export const getCountries = async ( nextTen: number = 1) => {

  const { data: countries } = await countriesApi.get<Countries[]>('?fields=name,capital,flag');
  return countries.slice( 0, nextTen * 10 );
};