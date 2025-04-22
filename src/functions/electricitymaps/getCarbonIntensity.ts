import { newHttpClient } from "../../util/HttpClient.ts";
import {CarbonIntensityResponse, toModel, ZoneCode, ZoneCodes} from "../../domain/CarbonIntensityResponse.ts";
import {partitionEithers} from "../../util/Arrays.ts";
import * as config from '../../config.ts'

const httpClient = newHttpClient(config.API_KEY)

const getEndpointUrl = (zone: ZoneCode) => `https://api.electricitymap.org/v3/carbon-intensity/history?zone=${zone}`

export const getCarbonIntensityForRegion = async (zone: ZoneCode) =>
    await httpClient.get<CarbonIntensityResponse>(getEndpointUrl(zone))

export const getCarbonIntensityForAllRegions = async() => {
    const result = await Promise.all([...ZoneCodes].map(getCarbonIntensityForRegion))
    const [errors, successes] = partitionEithers(result)
    //omitting proper error handling for simplicity
    errors.forEach(console.error)
    return successes.map(toModel)
}