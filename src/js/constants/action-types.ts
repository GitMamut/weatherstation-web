import { MeasuredValuesNames } from "../types";

export const SET_MEASURED_VALUE = "SET_MEASURED_VALUE";
export const SET_IS_BEING_FETCHED = "SET_IS_BEING_FETCHED";

export type MeasuredValuePayload = {
    value: number;
    measuredValueName: MeasuredValuesNames;
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


export type Actions = SetMeasuredValue | SetIsBeingFetched;