import {
    Actions, MeasuredValuePayload, IsBeingFetchedPayload,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../redux/rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue } from "../types";
import { measuredValues } from "../config";
import { setIsBeingFetched, setMeasuredValue } from "../redux/actions";

export function fetchSingleMeasuredValue(measuredValueName: MeasuredValuesNames):
    ThunkAction<void, AppState, undefined, Actions> {
    return (dispatch, getState: () => AppState) => {
        const measuredValue: MeasuredValue = measuredValues[measuredValueName];
        const sensor: Sensor = measuredValue.sensor;

        if (getState().measuredValues[measuredValueName].isFetched) {
            console.warn("Value is already being fetched:" + measuredValueName);
            return;
        }

        dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, true)));

        fetch(sensor.url)
            .then(response => response.json())
            .then((commonSensorReading: CommonSensorReading) => {
                console.log(JSON.stringify(commonSensorReading));
                const value: number = getCommonSensorValue(commonSensorReading, measuredValue.id);
                dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value)));
            })
            .catch(error => console.error(error))
            .finally(() => {
                dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false)));
            });
    }
};

function getCommonSensorValue(json: CommonSensorReading, measuredValueId: string) {
    const possiblyCommonSensorValue = json.values.find((v: CommonSensorValue) => v.name === measuredValueId);
    if (!possiblyCommonSensorValue) {
        throw "Could not read CommonSensorValue: " + JSON.stringify(json);
    }
    const value: number = parseFloat(possiblyCommonSensorValue.value);
    return value;
}

export function measuredValuePayload(measuredValueName: MeasuredValuesNames, value: number): MeasuredValuePayload {
    return {
        measuredValueName,
        value,
    };
}

export function isBeingFetchedPayload(measuredValueName: MeasuredValuesNames, isBeingFetched: boolean): IsBeingFetchedPayload {
    return {
        measuredValueName,
        isBeingFetched,
    };
}