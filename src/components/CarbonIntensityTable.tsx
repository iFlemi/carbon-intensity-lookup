import { CarbonIntensityModel } from "../domain/CarbonIntensityModel.ts";
import * as React from "react";
import {
    calculateMaxAverageIntensity,
    calculateMaxIntensityForHour,
    getHourIndices, isMaxValue
} from "../util/PageHelpers/CarbonIntensityTableHelpers.ts";
import {PrettyPrinter} from "mismatched";

type CarbonIntensityRowEntryProps = {
    carbonIntensity: CarbonIntensityModel[]
}

const CarbonIntensityTable: React.FC<CarbonIntensityRowEntryProps> = ({ carbonIntensity }) => {
    if (!carbonIntensity || carbonIntensity.length === 0) {
        return <div>No carbon intensity data available</div>;
    }

    const hourIndices = getHourIndices(carbonIntensity);
    const columnCount = carbonIntensity.length + 1;
    const maxAverageIntensity = calculateMaxAverageIntensity(carbonIntensity);

    return (
        <div
            className="grid"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
        >
            <div className="font-bold border p-2">Hour</div>
            {carbonIntensity.map((region, i) => (
                <div key={i} className="font-bold border p-2">{region.zoneName}</div>
            ))}

            {hourIndices.map(hourIndex => {
                PrettyPrinter.logToConsole(hourIndex)
                const maxIntensityForHour = calculateMaxIntensityForHour(carbonIntensity, hourIndex);

                return (
                    <React.Fragment key={hourIndex}>
                        <div className="border p-2">
                            {carbonIntensity[0].carbonIntensityData[hourIndex].dateTime.toFormat('dd/LL HH:mm')}
                        </div>
                        {
                            carbonIntensity.map((region, i) => {
                                const value = region.carbonIntensityData[hourIndex].carbonIntensity;
                                const isMax = isMaxValue(value, maxIntensityForHour);
                                return (
                                    <div
                                        key={i}
                                        className={`border p-2 ${isMax ? 'bg-green-800' : ''}`}>
                                        {value}
                                    </div>
                                );
                            })
                        }
                    </React.Fragment>
                );
            })}

            <div className="font-bold border p-2">24 hr Average</div>
            {carbonIntensity.map((region, i) => {
                const value = region.dayAverageCarbonIntensity;
                const isMax = isMaxValue(value, maxAverageIntensity);
                return (
                    <div key={i} className={`font-bold border p-2 ${isMax ? 'bg-green-800' : ''}`}>
                        {value}
                    </div>
                );
            })}
        </div>
    );
};

export default CarbonIntensityTable;