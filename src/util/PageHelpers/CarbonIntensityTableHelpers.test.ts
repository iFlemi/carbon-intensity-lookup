import { describe, it } from 'vitest'
import {CarbonIntensityModel} from "../../domain/CarbonIntensityModel.ts"
import {
    calculateMaxAverageIntensity,
    calculateMaxIntensityForHour,
    getHourIndices, isMaxValue
} from "./CarbonIntensityTableHelpers.ts"
import {
    CarbonIntensityDataPointTestBuilder,
    CarbonIntensityModelTestBuilder
} from "../../domain/CarbonIntensityModelTestBuilder.ts"
import {assertThat} from "mismatched"
import {TEST_DATE_ISO} from "../Constants.ts"
import {DateTime} from "luxon"

describe('CarbonIntensityTable Functions', () => {
    const createTestData = (): CarbonIntensityModel[] => {
        const hour1 = DateTime.fromISO(TEST_DATE_ISO)
        const hour2 = hour1.plus({hours: 1})
        const hour3 = hour2.plus({hours: 1})

        const region1Data = [
            new CarbonIntensityDataPointTestBuilder(hour1, 10).to(),
            new CarbonIntensityDataPointTestBuilder(hour2, 2).to(),
            new CarbonIntensityDataPointTestBuilder(hour3, 30).to()]

        const region2Data = [
            new CarbonIntensityDataPointTestBuilder(hour1, 10).to(),
            new CarbonIntensityDataPointTestBuilder(hour2, 20).to(),
            new CarbonIntensityDataPointTestBuilder(hour3, 3).to()]

        const region1 = new CarbonIntensityModelTestBuilder().withData(region1Data).withDayAverage(100).to()
        const region2 = new CarbonIntensityModelTestBuilder().withData(region2Data).withDayAverage(200).to()
        return [region1, region2]
    }

    describe('getHourIndices', () => {
        it('should return indices based on the length of carbonIntensityData in the first element', () => {
            const carbonIntensity = createTestData()

            const result = getHourIndices(carbonIntensity)

            assertThat(result).is([0, 1, 2])
        })

        it('should return empty array for empty input', () => {
            const result = getHourIndices([])

            assertThat(result).is([])
        })
    })

    describe('calculateMaxIntensityForHour', () => {
        it('should find the maximum carbon intensity for a given hour across all regions', () => {
            const carbonIntensity = createTestData()

            assertThat(calculateMaxIntensityForHour(carbonIntensity, 0)).is(10)
            assertThat(calculateMaxIntensityForHour(carbonIntensity, 1)).is(20)
            assertThat(calculateMaxIntensityForHour(carbonIntensity, 2)).is(30)
        })


        it('should return 0 if hour index out of bounds', () => {
            const carbonIntensity = createTestData()
            assertThat(calculateMaxIntensityForHour(carbonIntensity, 10)).is(0)
        })
    })

    describe('calculateMaxAverageIntensity', () => {
        it('should find the maximum day average carbon intensity across all regions', () => {
            const carbonIntensity = createTestData()

            const result = calculateMaxAverageIntensity(carbonIntensity)

            assertThat(result).is(200)
        })
    })

    describe('isMaxValue', () => {
        it('should return true when value equals maxValue', () => {
            assertThat(isMaxValue(100, 100)).is(true)
        })

        it('should return false when value is less than maxValue', () => {
            assertThat(isMaxValue(90, 100)).is(false)
        })

        it('should return false when value is greater than maxValue', () => {
            assertThat(isMaxValue(110, 100)).is(false)
        })
    })
})