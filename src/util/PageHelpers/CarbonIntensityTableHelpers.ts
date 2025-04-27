import {CarbonIntensityModel} from "../../domain/CarbonIntensityModel.ts";

export const getHourIndices = (carbonIntensity: CarbonIntensityModel[]): number[] => {
    if (!carbonIntensity.length) return []
    return carbonIntensity[0].carbonIntensityData.map((_, i) => i)
}

export const calculateMaxIntensityForHour = (carbonIntensity: CarbonIntensityModel[], hourIndex: number): number => {
    //for simplicity: proper error handling would be to make this use a Result/Option type.
    if (hourIndex > carbonIntensity.length) return 0

    const allForHour = carbonIntensity.map(ci => ci.carbonIntensityData[hourIndex].carbonIntensity);
    return Math.max(...allForHour)
}

export const calculateMaxAverageIntensity = (carbonIntensity: CarbonIntensityModel[]): number => {
    return Math.max(...carbonIntensity.map(ci => ci.dayAverageCarbonIntensity))
}

export const isMaxValue = (value: number, maxValue: number): boolean => {
    return value === maxValue
}

