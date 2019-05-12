import { MeasuredValues, Sensors } from "../js/types";

export const SENSOR_MERGER_URL = "http://raspberrypi:7001/";
export const DB_SERVICE = "https://mintfrost-db.herokuapp.com/";

export const sensors: Sensors = {
    outdoor: {
        name: "outdoor",
        url: "http://raspberrypi:8080/commonOutdoor",
        availableValues: ["temperature"],
    },
    indoor2: {
        name: "indoor2",
        url: "http://raspberrypi:8080/commonIndoor2",
        availableValues: ["temperature"],
    },
};

export const measuredValues: MeasuredValues = {
    outdoor_temperature: {
        sensor: sensors.outdoor,
        id: "temperature",
        unit: "°C",
        name: "Outdoor temperature",
    },
    indoor2_temperature: {
        sensor: sensors.indoor2,
        id: "temperature",
        unit: "°C",
        name: "Indoor2 temperature",
    }
};
