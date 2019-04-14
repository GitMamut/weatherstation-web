import {
  Actions, MeasuredValuePayload, SetMeasuredValue, SET_MEASURED_VALUE, IsBeingFetchedPayload, SetIsBeingFetched, SET_IS_BEING_FETCHED,
} from "../constants/action-types";
import { ThunkAction } from "redux-thunk";
import { AppState } from "./rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue, SensorMergerType } from "../types";
import { measuredValues, SENSOR_MERGER_URL } from "../config";

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
        console.log(value);
        dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value)));
      })
      .catch(error => console.error(error))
      .finally(() => {
        dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false)));
      });
  }
};

export function fetchMultipleMeasuredValues(measuredValueNames: MeasuredValuesNames[]):
  ThunkAction<void, AppState, undefined, Actions> {
  return (dispatch, getState: () => AppState) => {

    measuredValueNames.forEach(measuredValueName =>
      dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, true))));

    fetch(SENSOR_MERGER_URL)
      .then(response => response.json())
      .then((sensorMergerReading: SensorMergerType) => {
        console.log(JSON.stringify(sensorMergerReading));
        measuredValueNames.forEach(measuredValueName => {
          const value: number = getSensorMergerValue(sensorMergerReading, measuredValueName);
          console.log(value);
          dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value)));
        })
      })
      .catch(error => console.error(error))
      .finally(() => {
        measuredValueNames.forEach(measuredValueName =>
          dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false))));
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

function getSensorMergerValue(json: SensorMergerType, measuredValueName: MeasuredValuesNames) {
  const value: number = json.sensorReadings[measuredValueName];
  if (!value) {
    throw "Could not read SensorMergerValue: " + JSON.stringify(json);
  }
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
