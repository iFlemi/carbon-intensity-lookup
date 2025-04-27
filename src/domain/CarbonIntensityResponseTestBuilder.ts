import {CarbonIntensity, CarbonIntensityResponse, ZoneCode, ZoneCodes} from "./CarbonIntensityResponse.ts";
import {primitiveBuilder} from "mismatched";
import {TEST_DATE_ISO} from "../util/Constants.ts";

export class CarbonIntensityResponseTestBuilder {
    private carbonIntensityResponse: CarbonIntensityResponse

    constructor(zone?: ZoneCode, dateTimeIso?: string) {
       zone ??= ZoneCodes[primitiveBuilder.int(0, ZoneCodes.length)]
        const datetime = dateTimeIso ?? TEST_DATE_ISO
        this.carbonIntensityResponse = {
            history: [new CarbonIntensityTestBuilder(zone, datetime).to()],
            zone
        }
    }

    withCarbonIntensityHistory(history: CarbonIntensity[]){
        this.carbonIntensityResponse.history = history
        return this
    }

    to() {
        return this.carbonIntensityResponse
    }
}

export class CarbonIntensityTestBuilder {
    private carbonIntensity: CarbonIntensity

    constructor(zone: ZoneCode, dateTimeIso: string | null | undefined) {
        this.carbonIntensity = {
            zone,
            carbonIntensity: primitiveBuilder.int(0, 1000),
            updatedAt: TEST_DATE_ISO,
            createdAt: TEST_DATE_ISO,
            emissionFactorType: "lifecycle",
            datetime: dateTimeIso
        }
    }

    to() {
        return this.carbonIntensity
    }
}