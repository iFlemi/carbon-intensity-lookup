import {CarbonIntensityModel} from "../../domain/CarbonIntensityModel.ts";

export const getHourIndices = (carbonIntensity: CarbonIntensityModel[]): number[] => {
    if (!carbonIntensity.length) return []
    return carbonIntensity[0].carbonIntensityData.map((_, i) => i)
}

export const calculateMaxIntensityForHour = (carbonIntensity: CarbonIntensityModel[], hourIndex: number): number => {
    const allForHour = carbonIntensity.map(ci => {
        if (hourIndex > ci.carbonIntensityData.length) return 0
        return ci.carbonIntensityData[hourIndex].carbonIntensity
    })
    return Math.max(...allForHour)
}

export const calculateMaxAverageIntensity = (carbonIntensity: CarbonIntensityModel[]): number => {
    return Math.max(...carbonIntensity.map(ci => ci.dayAverageCarbonIntensity))
}

export const isMaxValue = (value: number, maxValue: number): boolean => {
    return value === maxValue
}

