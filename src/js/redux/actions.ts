import {
  MeasuredValuePayload, SetMeasuredValue, SET_MEASURED_VALUE, IsBeingFetchedPayload, SetIsBeingFetched, SET_IS_BEING_FETCHED, SetSensorMergerIsBeingFetched, SET_SENSOR_MERGER_IS_BEING_FETCHED,
} from "../constants/action-types";

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

export function setSensorMergerIsBeingFetched(payload: boolean): SetSensorMergerIsBeingFetched {
  return {
    type: SET_SENSOR_MERGER_IS_BEING_FETCHED,
    payload
  }
};
