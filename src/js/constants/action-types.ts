import { MeasuredValuesNames, Source } from "../types";
import { Moment } from "moment";

export const SET_MEASURED_VALUE = "SET_MEASURED_VALUE";
export const SET_IS_BEING_FETCHED = "SET_IS_BEING_FETCHED";
export const SET_SENSOR_MERGER_IS_BEING_FETCHED = "SET_SENSOR_MERGER_IS_BEING_FETCHED";

export type MeasuredValuePayload = {
    value: number;
    measuredValueName: MeasuredValuesNames;
    date: Moment;
    source: Source;
};

export type IsBeingFetchedPayload = {
    isBeingFetched: boolean;
    measuredValueName: MeasuredValuesNames;
};

export type SetMeasuredValue = {
    type: typeof SET_MEASURED_VALUE;
    payload: MeasuredValuePayload;
}

export type SetIsBeingFetched = {
    type: typeof SET_IS_BEING_FETCHED;
    payload: IsBeingFetchedPayload;
}

export type SetSensorMergerIsBeingFetched = {
    type: typeof SET_SENSOR_MERGER_IS_BEING_FETCHED;
    payload: boolean;
}

export type Actions =
    SetMeasuredValue |
    SetIsBeingFetched |
    SetSensorMergerIsBeingFetched;