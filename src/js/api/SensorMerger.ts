import {
    Actions, MeasuredValuePayload, IsBeingFetchedPayload,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../redux/rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue, SensorMergerType } from "../types";
import { measuredValues, SENSOR_MERGER_URL } from "../config";
import { setIsBeingFetched, setMeasuredValue, setSensorMergerIsBeingFetched } from "../redux/actions";
import { isBeingFetchedPayload, measuredValuePayload } from "./CommonSensor";
import { fetchLatestValuesFromDb } from "./Firebase";

export function fetchMultipleMeasuredValues(measuredValueNames: MeasuredValuesNames[]):
    ThunkAction<void, AppState, undefined, Actions> {
    return (dispatch, getState: () => AppState) => {

        if (getState().sensorMergerIsFetched) {
            console.warn("Sensor merger is already being fetched");
            return;
        }

        dispatch(setSensorMergerIsBeingFetched(true));
        measuredValueNames.forEach(measuredValueName =>
            dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, true))));

        fetch(SENSOR_MERGER_URL)
            .then(response => response.json())
            .then((sensorMergerReading: SensorMergerType) => {
                console.log(JSON.stringify(sensorMergerReading));
                measuredValueNames.forEach(measuredValueName => {
                    const value: number = getSensorMergerValue(sensorMergerReading, measuredValueName);
                    dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value)));
                })
            })
            .catch(error => { 
                console.warn("Direct sensor request failed: " + error);
                console.warn("Trying to fetch latest DB values");
                fetchLatestValuesFromDb(measuredValueNames, dispatch);
                // console.error(error);
            })
            .finally(() => {
                measuredValueNames.forEach(measuredValueName =>
                    dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false))));
                dispatch(setSensorMergerIsBeingFetched(false));
            });
    }
};

function getSensorMergerValue(json: SensorMergerType, measuredValueName: MeasuredValuesNames) {
    const value: number = json.sensorReadings[measuredValueName];
    if (!value) {
        throw "Could not read SensorMergerValue: " + JSON.stringify(json);
    }
    return value;
}
