import { CarbonIntensityModel } from "../domain/CarbonIntensityModel.ts";
import * as React from "react";

type CarbonIntensityRowEntryProps = {
    carbonIntensity: CarbonIntensityModel[]
}

const CarbonIntensityTable: React.FC<CarbonIntensityRowEntryProps> = ({ carbonIntensity }) => {
    const hours = carbonIntensity[0]
        .carbonIntensityData.map((_, i) => i)

    const columnCount = carbonIntensity.length + 1

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

            {hours.map(hour => {
                const allForHour = carbonIntensity.map(ci => ci.carbonIntensityData[hour].carbonIntensity)
                const max = Math.max(...allForHour)

                return (
                    <React.Fragment key={hour}>
                        <div className="border p-2">
                            {carbonIntensity[0].carbonIntensityData[hour].dateTime.toFormat('dd/LL HH:mm')}
                        </div>
                        {
                            carbonIntensity.map((region, i) => {
                            const value = region.carbonIntensityData[hour].carbonIntensity
                            const isMax = value === max
                            return (
                                <div
                                    key={i}
                                    className={`border p-2 ${isMax ? 'bg-green-800' : ''}`}>
                                    {value}
                                </div>
                            )})
                        }
                    </React.Fragment>
                )
            })}

            <div className="font-bold border p-2">24 hr Average</div>
            {carbonIntensity.map((region, i) => {
                const maxAverage = Math.max(...carbonIntensity.map(ci => ci.dayAverageCarbonIntensity))
                const value = region.dayAverageCarbonIntensity
                const isMax = value === maxAverage
                return (
                    <div key={i} className={`font-bold border p-2 ${isMax ? 'bg-green-800' : ''}`}>{value}</div>
                )})}
        </div>
    )
}

export default CarbonIntensityTable