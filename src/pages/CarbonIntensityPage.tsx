import * as React from "react";
import {CarbonIntensityModel} from "../domain/CarbonIntensityModel.ts";
import {useEffect, useState} from "react";
import {getCarbonIntensityForAllRegions} from "../functions/electricitymaps/getCarbonIntensity.ts";
import CarbonIntensityTable from "../components/CarbonIntensityTable.tsx";
import {GetMilliSecondsToNextHour} from "../util/DateTime.ts";

const CarbonIntensityPage: React.FC = () => {
    const [carbonIntensityData, setCarbonIntensityData]= useState<CarbonIntensityModel[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const data = await getCarbonIntensityForAllRegions()
                setCarbonIntensityData(data)
                setIsLoading(false)
            } catch (err) {
                setError("Failed to fetch carbon intensity data");
                setIsLoading(false);
                console.error(err);
            }
        }
        fetchData()

        const millisecondUntilNextHour = GetMilliSecondsToNextHour()
        console.log(`fetching data in ${millisecondUntilNextHour/1000} sec`)
        setTimeout(() => {
            fetchData()
            setInterval(fetchData, 3600000)
        }, millisecondUntilNextHour)
        }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="mt-12">
            <CarbonIntensityTable carbonIntensity={carbonIntensityData} />
        </div>
    )
}

export default CarbonIntensityPage;