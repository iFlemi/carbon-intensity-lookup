import {DateTime} from "luxon";
import {CarbonIntensityDataPoint, CarbonIntensityModel} from "./CarbonIntensityModel.ts";
import {getRoundedAverage} from "../util/Arrays.ts";

export type EmissionFactorType = 'lifecycle' | 'direct'

//typing this parameter so that it can only ever be a valid input - using as const / typeof ZoneCodes to use it as both a type array and a string array
export const ZoneCodes = [/*'IT' ,*/'IT-CNO' , 'IT-CSO' , 'IT-NO' , 'IT-SO' , 'IT-SAR' , 'IT-SIC'] as const
export type ZoneCode = (typeof ZoneCodes)[number]

export const ZoneDisplayNames: Record<ZoneCode, string> = {
    'IT-CNO': 'Central North Italy',
    'IT-CSO': 'Central South Italy',
    'IT-NO': 'North Italy',
    'IT-SO': 'South Italy',
    'IT-SAR': 'Sardinia',
    'IT-SIC': 'Sicily'
};

export type EstimationMethod = 'TIME_SLICER_AVERAGE'

export type CarbonIntensity = {
    zone: ZoneCode
    carbonIntensity: number
    datetime?: string | null
    updatedAt: string
    createdAt: string
    emissionFactorType: EmissionFactorType,
    isEstimated?: boolean | null
    estimationMethod?: EstimationMethod | null
}

export type CarbonIntensityResponse = {
    zone: ZoneCode
    history: CarbonIntensity[]
}

export const toModel = (response: CarbonIntensityResponse): CarbonIntensityModel => {
   const carbonIntensityData: CarbonIntensityDataPoint[] = response.history
           //usually use a helper to abstract away this kind of null/undefined check, manually specified here instead of bringing in that util library
           .filter((r): r is typeof r & { datetime: string } => r.datetime !== null && r.datetime !== undefined)
           .map(r => ({
               dateTime: DateTime.fromISO(r.datetime),
               carbonIntensity: r.carbonIntensity,
               carbonIntensityUnit: "gCO2eq/kWh"
           }))

   return {
       carbonIntensityData,
       dayAverageCarbonIntensity: getRoundedAverage(
           carbonIntensityData.map(cid => cid.carbonIntensity)),
       zoneName: ZoneDisplayNames[response.zone]
   }
}