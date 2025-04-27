# Italian Carbon Intensity Example App 

Display the carbon intensity (in gCO2eq/kWh) of electricity consumed in each of the six Italian regions for the last 24 hours.

## Notes/Assumptions

1) The general Italy region 'IT' as been omitted
2) I switched the table format from columns to rows as there was more vertical data


## To run locally

1) clone repo
2) add config.ts file to /src
```
export const API_KEY = 'api_key_goes_here'
```
3) `npm i`
4) `npm run dev`
5) `npm run tests` for tests