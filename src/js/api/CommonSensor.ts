import {
    Actions, MeasuredValuePayload, IsBeingFetchedPayload,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../redux/rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue } from "../types";
import { measuredValues } from "../../config/config";
import { setIsBeingFetched, setMeasuredValue } from "../redux/actions";
import { fetchLatestValuesFromDb } from "./SensorMerger";
import { Moment } from "moment";
import moment from "moment";

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
                const date: Moment = getCommonSensorDate(commonSensorReading);
                dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value, date)));
            })
            .then(() => {
                dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false)));
            })
            .catch(error => {
                console.warn("Direct sensor request failed: " + error);
                console.warn("Trying to fetch latest DB values");
                fetchLatestValuesFromDb([measuredValueName], dispatch);
                // console.error(error);
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

function getCommonSensorDate(json: CommonSensorReading) {
    return moment(json.date);
}

export function measuredValuePayload(measuredValueName: MeasuredValuesNames, value: number, date: Moment): MeasuredValuePayload {
    return {
        measuredValueName,
        value,
        date,
    };
}

export function isBeingFetchedPayload(measuredValueName: MeasuredValuesNames, isBeingFetched: boolean): IsBeingFetchedPayload {
    return {
        measuredValueName,
        isBeingFetched,
    };
}