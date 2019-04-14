export type MeasuredValuesNames = "outdoor_temperature" |  "indoor1_temperature";
export type SensorsNames = "outdoor" | "indoor1";

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