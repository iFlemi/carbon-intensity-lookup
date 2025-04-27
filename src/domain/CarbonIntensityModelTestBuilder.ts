import {CarbonIntensityDataPoint, CarbonIntensityModel} from "./CarbonIntensityModel.ts";
import {primitiveBuilder} from "mismatched";
import {DateTime} from "luxon";

export class CarbonIntensityModelTestBuilder {
    private carbonIntensityModel: CarbonIntensityModel

    constructor() {
        this.carbonIntensityModel = {
            carbonIntensityData: [new CarbonIntensityDataPointTestBuilder().to()],
            dayAverageCarbonIntensity: primitiveBuilder.int(0, 1000),
            zoneName: primitiveBuilder.aString("zoneName")
        }
    }

    withData(data: CarbonIntensityDataPoint[]) {
        this.carbonIntensityModel.carbonIntensityData = data
        return this
    }

    to() {
        return this.carbonIntensityModel
    }
}

export class CarbonIntensityDataPointTestBuilder {
    private dataPoint: CarbonIntensityDataPoint

    constructor(dateTime?: DateTime) {
        this.dataPoint = {
            dateTime: dateTime ??  DateTime.fromISO(new Date(2024, 12, 25).toISOString()),
            carbonIntensity: primitiveBuilder.int(0, 1000),
            carbonIntensityUnit: "gCO2eq/kWh"
        }
    }

    to(){
        return this.dataPoint
    }
}