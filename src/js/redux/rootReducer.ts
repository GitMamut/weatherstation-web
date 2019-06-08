import { Actions, SET_MEASURED_VALUE, SET_IS_BEING_FETCHED, SET_SENSOR_MERGER_IS_BEING_FETCHED } from "../constants/action-types";
import { MeasuredValuesNames, Source } from "../types";
import { Moment } from "moment";

export type MeasuredValueIndicator = {
    value: number;
    isFetched: boolean;
    date?: Moment;
    source: Source;
}

export type AppState = {
    measuredValues: {
        [K in MeasuredValuesNames]: MeasuredValueIndicator;
    };
    sensorMergerIsFetched: boolean;
};

const initialState = {
    measuredValues: {
        outdoor_temperature: {
            value: 0,
            isFetched: false,
            date: undefined,
            source: Source.unknown,
        },
        indoor1_humidity: {
            value: 0,
            isFetched: false,
            date: undefined,
            source: Source.unknown,
        },
        indoor2_temperature: {
            value: 0,
            isFetched: false,
            date: undefined,
            source: Source.unknown,

        },
        indoor2_pressure: {
            value: 0,
            isFetched: false,
            date: undefined,
            source: Source.unknown,
        },
    },
    sensorMergerIsFetched: false,
};

function rootReducer(state: AppState = initialState, action: Actions) {
    switch (action.type) {
        case SET_MEASURED_VALUE:
            return {
                ...state,
                measuredValues: {
                    ...state.measuredValues,
                    [action.payload.measuredValueName]: {
                        ...state.measuredValues[action.payload.measuredValueName],
                        value: action.payload.value,
                        date: action.payload.date,
                        source: action.payload.source,
                    },
                }
            };
        case SET_IS_BEING_FETCHED:
            return {
                ...state,
                measuredValues: {
                    ...state.measuredValues,
                    [action.payload.measuredValueName]: {
                        ...state.measuredValues[action.payload.measuredValueName],
                        isFetched: action.payload.isBeingFetched,
                    },
                }
            };
        case SET_SENSOR_MERGER_IS_BEING_FETCHED:
            return {
                ...state,
                sensorMergerIsFetched: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
