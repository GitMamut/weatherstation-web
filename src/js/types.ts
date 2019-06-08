export type MeasuredValuesNames = 
    "outdoor_temperature" |  "indoor2_temperature" | "indoor1_humidity" | "indoor2_pressure";

export type SensorsNames = "outdoor" | "indoor1" | "indoor2";

export enum Source {live, database, merger, unknown};

export type Sensors = {
    [K in SensorsNames]: Sensor;
}

export type Sensor = {
    name: string;
    url: string;
    availableValues: string[];
};

export type MeasuredValues = {
    [K in MeasuredValuesNames]: MeasuredValue;
};

export type MeasuredValue = {
    sensor: Sensor;
    unit: string;
    name: string;
    id: string;
};

export type CommonSensorReading = {
    name: SensorsNames;
    date: number;
    values: CommonSensorValue[];
};

export type CommonSensorValue = {
    name: string;
    value: string;
};

export type DbResponseType = {
    date: string;
    values: SensorMergerReadings,
};

export type SensorMergerType = {
    date: number;
    sensorReadings: SensorMergerReadings,
    errors: SensorMergerErrorType[],
};

export type SensorMergerReadings = {
    [K in MeasuredValuesNames]: number;
};

export type SensorMergerErrorType = {
    error: {
        message: string;
    },
}