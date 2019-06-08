import {
  Actions, MeasuredValuePayload, IsBeingFetchedPayload,
} from "../constants/action-types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "../redux/rootReducer";
import { MeasuredValuesNames, MeasuredValue, Sensor, CommonSensorReading, CommonSensorValue, SensorMergerType, SensorMergerReadings, DbResponseType } from "../types";
import { measuredValues, SENSOR_MERGER_URL, DB_SERVICE } from "../../config/config";
import { setIsBeingFetched, setMeasuredValue, setSensorMergerIsBeingFetched } from "../redux/actions";
import { isBeingFetchedPayload, measuredValuePayload } from "./CommonSensor";
import moment, { Moment } from "moment";

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
      .then((sensorMergerResponse: SensorMergerType) => {
        const date = moment(sensorMergerResponse.date);
        const readings: SensorMergerReadings = sensorMergerResponse.sensorReadings;
        console.log(JSON.stringify(readings));
        updateMeasuredValues(measuredValueNames, readings, dispatch, date);
      })
      .then(() => {
        measuredValueNames.forEach(measuredValueName =>
          dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false))));
        dispatch(setSensorMergerIsBeingFetched(false));
      })
      .catch(error => {
        console.warn("Direct sensor request failed: " + error);
        console.warn("Trying to fetch latest DB values");
        fetchLatestValuesFromDb(measuredValueNames, dispatch);
        // console.error(error);
      });
  }
};

function updateMeasuredValues(measuredValueNames: MeasuredValuesNames[],
  readings: SensorMergerReadings,
  dispatch: ThunkDispatch<AppState, undefined, Actions>,
  date: Moment) {
  measuredValueNames.forEach(measuredValueName => {
    const value: number = getSensorReadingValue(readings, measuredValueName);
    dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value, date)));
  });
}

function getSensorReadingValue(readings: SensorMergerReadings, measuredValueName: MeasuredValuesNames) {
  const value: number = readings[measuredValueName];
  if (!value) {
    throw "Could not read SensorReadingValue: " + JSON.stringify(readings);
  }
  return value;
}

export function fetchLatestValuesFromDb(measuredValueNames: MeasuredValuesNames[], dispatch: ThunkDispatch<AppState, undefined, Actions>) {
  fetch(DB_SERVICE)
    .then(response => response.json())
    .then((sensorMergerResponse: DbResponseType) => {
      const date = moment(parseInt(sensorMergerResponse.date));
      const readings: SensorMergerReadings = sensorMergerResponse.values;
      console.log(JSON.stringify(readings));
      updateMeasuredValues(measuredValueNames, readings, dispatch, date);
    })
    .catch(error => console.error(error))
    .finally(() => {
      measuredValueNames.forEach(measuredValueName =>
        dispatch(setIsBeingFetched(isBeingFetchedPayload(measuredValueName, false))));
      dispatch(setSensorMergerIsBeingFetched(false));
    })

}
