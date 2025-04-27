import {DateTime} from "luxon";

export type CarbonIntensityModel = {
    zoneName: string
    carbonIntensityData: CarbonIntensityDataPoint[]
    dayAverageCarbonIntensity: number
}

export type CarbonIntensityDataPoint = {
    dateTime: DateTime
    carbonIntensity: number
    //hardcoding for simplicity, should be typed
    carbonIntensityUnit: 'gCO2eq/kWh'
}