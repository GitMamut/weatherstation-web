import { MeasuredValues, Sensors } from "../js/types";

export const SENSOR_MERGER_URL = "http://raspberrypi1:7001/";
export const DB_SERVICE = "https://mintfrost-db.herokuapp.com/";

export const sensors: Sensors = {
    outdoor: {
        name: "outdoor",
        url: "http://raspberrypi:8080/commonOutdoor",
        availableValues: ["temperature"],
    },
    indoor1: {
        name: "indoor1",
        url: "http://raspberrypi:8080/commonIndoor1",
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
    indoor1_temperature: {
        sensor: sensors.indoor1,
        id: "temperature",
        unit: "°C",
        name: "Indoor1 temperature",
    }
};
