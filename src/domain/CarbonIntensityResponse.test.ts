// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {assertThat, match, PrettyPrinter, primitiveBuilder} from "mismatched";
import { describe, it } from "vitest";
import {toModel, ZoneCodes, ZoneDisplayNames} from "./CarbonIntensityResponse.ts";
import {CarbonIntensityResponseTestBuilder, CarbonIntensityTestBuilder} from "./CarbonIntensityResponseTestBuilder.ts";
import {DateTime} from "luxon";
import {TEST_DATE_ISO} from "../util/Constants.ts";

describe('CarbonIntensityResponse tests',  () => {
    it('should transform a valid response into a valid Model', () => {
        const response = new CarbonIntensityResponseTestBuilder().to()
        const result = toModel(response)

        //PrettyPrinter.logToConsole(response)
        //PrettyPrinter.logToConsole(result)

        assertThat(result.zoneName).is(ZoneDisplayNames[response.zone])
        assertThat(result.carbonIntensityData[0].carbonIntensity).is(response.history[0].carbonIntensity)
        assertThat(result.carbonIntensityData[0].dateTime).is(DateTime.fromISO(response.history[0].datetime!))
    })

    it('should filter out entries without datetime values', () => {
        const zone = ZoneCodes[primitiveBuilder.int(0, ZoneCodes.length)]
        const history1 = new CarbonIntensityTestBuilder(zone, TEST_DATE_ISO).to()
        const history2 = new CarbonIntensityTestBuilder(zone, null).to()
        const history3 = new CarbonIntensityTestBuilder(zone, undefined).to()
        const response = new CarbonIntensityResponseTestBuilder(zone).withCarbonIntensityHistory([history1, history2, history3]).to()
        const result = toModel(response)
        assertThat(result.carbonIntensityData.length).is(1)
        assertThat(result.zoneName).is(ZoneDisplayNames[response.zone])
        assertThat(result.carbonIntensityData[0].carbonIntensity).is(response.history[0].carbonIntensity)
        assertThat(result.carbonIntensityData[0].dateTime).is(DateTime.fromISO(response.history[0].datetime!))
    })

    it('should handle an empty history', () => {
        const zone = ZoneCodes[primitiveBuilder.int(0, ZoneCodes.length)]
        const response = new CarbonIntensityResponseTestBuilder(zone).withCarbonIntensityHistory([]).to()
        const result = toModel(response)

        assertThat(result.carbonIntensityData.length).is(0)
        assertThat(result.zoneName).is(ZoneDisplayNames[response.zone])
    })
})