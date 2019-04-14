import firebase from "firebase";
import { MeasuredValuesNames, SensorMergerReadings } from "../types";
import { Dispatch } from "redux";
import { setMeasuredValue } from "../redux/actions";
import { measuredValuePayload } from "./CommonSensor";
import { dbConfig } from "../db_config";

export const initDb = (db: Object) => {
  console.log("Initializing Firebase DB...");
  firebase.initializeApp(db);
  console.log("Firebase DB started");
  // testConnection();
}

export const fetchLatestValuesFromDb = (measuredValueNames: MeasuredValuesNames[], dispatch: Dispatch) => {
  if (!firebase.apps.length) {
    initDb(dbConfig);
  } else {
    firebase.database().goOnline();
    console.log("Firebase DB went online");
  }

  console.log("DB > ref('/sensor-readings/')");
  firebase.database().ref('/sensor-readings/').orderByKey().limitToLast(1).once('value')
    .then(snapshot => {
      const dateKey = Object.keys(snapshot.val())[0];
      const values = snapshot.val()[dateKey];
      console.log("DB < " + JSON.stringify(values));

      measuredValueNames.forEach(measuredValueName => {
        const value: number = getDbValue(values, measuredValueName);
        dispatch(setMeasuredValue(measuredValuePayload(measuredValueName, value)));
      })
    })
    .catch(e => console.error(e))
    .finally(() => {
      firebase.database().goOffline();
      console.log("Firebase DB gone offline, as planned");
    });
}

function getDbValue(json: SensorMergerReadings, measuredValueName: MeasuredValuesNames) {
  const value: number = json[measuredValueName];
  if (!value) {
    throw "Could not read SensorMergerReadings: " + JSON.stringify(json);
  }
  return value;
}

function testConnection() {
  console.log("DB > ref('/hello/')");
  firebase.database().ref('/hello/').once('value')
    .then(snapshot => console.log("DB < " + snapshot.val()))
    .catch(e => console.error(e));
}
