import {DateTime} from "luxon";

export const GetMilliSecondsToNextHour = () => {
    const now = DateTime.utc()
    const nextHour= now.startOf("hour").plus({hours: 1})
    return nextHour.diff(now).as('milliseconds')
}