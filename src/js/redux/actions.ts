import {
    Actions, MeasuredValuePayload, SetMeasuredValue, SET_MEASURED_VALUE, IsBeingFetchedPayload, SetIsBeingFetched, SET_IS_BEING_FETCHED,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "./rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue } from "../types";
import { measuredValues } from "../config";

export function setMeasuredValue(payload: MeasuredValuePayload): SetMeasuredValue {
    return {
        type: SET_MEASURED_VALUE,
        payload
    }
};

export function setIsBeingFetched(payload: IsBeingFetchedPayload): SetIsBeingFetched {
    return {
        type: SET_IS_BEING_FETCHED,
        payload
    }
};

export function fetchMeasuredValue(measuredValueName: MeasuredValuesNames):
    ThunkAction<void, AppState, undefined, Actions> {
    return dispatch => {
        const measuredValue: MeasuredValue = measuredValues[measuredValueName];
        const sensor: Sensor = measuredValue.sensor;

        dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, true)));

        fetch(sensor.url)
            .then(response => response.json())
            .then((commonSensorReading: CommonSensorReading) => {
                console.log(JSON.stringify(commonSensorReading));
                const value: number = getCommonSensorValue(commonSensorReading, measuredValue.id);
                console.log(value);
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
        throw "Could not read CommonSensorValue: " + JSON.stringify(possiblyCommonSensorValue);
    }
    const value: number = parseFloat(possiblyCommonSensorValue.value);
    return value;
}

function measuredValuePayload(measuredValueName: MeasuredValuesNames, value: number): MeasuredValuePayload {
    return {
        measuredValueName,
        value,
    };
}

function isBeingFetchedPayload(measuredValueName: MeasuredValuesNames, isBeingFetched: boolean): IsBeingFetchedPayload {
    return {
        measuredValueName,
        isBeingFetched,
    };
}

