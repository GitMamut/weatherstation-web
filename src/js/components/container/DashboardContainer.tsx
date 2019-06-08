import React, { Dispatch } from "react";
import ValueDisplay from "../presentational/ValueDisplay";
import { connect } from "react-redux";
import { Actions } from "../../constants/action-types";
import { AppState, MeasuredValueIndicator } from "../../redux/rootReducer";
import { ThunkAction } from "redux-thunk";
import { MeasuredValuesNames } from "../../types";
import Dashboard from "../presentational/Dashboard";
import { fetchSingleMeasuredValue } from "../../api/CommonSensor";
import { fetchMultipleMeasuredValues } from "../../api/SensorMerger";
import { temperature, humidity, pressure } from "../../constants/palettes";

type DispatchProps = {
  fetchMeasuredValue: (measuredValueName: MeasuredValuesNames) => void,
  fetchMultipleMeasuredValues: (measuredValueNames: MeasuredValuesNames[]) => void
};

type StateProps = {
  outdoor_temperature: MeasuredValueIndicator,
  indoor2_temperature: MeasuredValueIndicator,
  indoor1_humidity: MeasuredValueIndicator,
  indoor2_pressure: MeasuredValueIndicator,
};

type Props = StateProps & DispatchProps;

type State = {};

class DashboardContainerConnected extends React.Component<Props, State> {
  public render() {
    return (
      <Dashboard>
        <ValueDisplay
          isFetched={this.props.outdoor_temperature.isFetched}
          label="outdoor"
          reading={this.props.outdoor_temperature.value}
          date={this.props.outdoor_temperature.date}
          source={this.props.outdoor_temperature.source}
          paletteColor={temperature}
          onClick={() => this.props.fetchMeasuredValue("outdoor_temperature")}
        />
        <ValueDisplay
          isFetched={this.props.indoor2_temperature.isFetched}
          label="indoor"
          reading={this.props.indoor2_temperature.value}
          date={this.props.indoor2_temperature.date}
          source={this.props.indoor2_temperature.source}
          paletteColor={temperature}
          onClick={() => this.props.fetchMeasuredValue("indoor2_temperature")}
        />
        <ValueDisplay
          isFetched={this.props.indoor1_humidity.isFetched}
          label="humidity"
          reading={this.props.indoor1_humidity.value}
          date={this.props.indoor1_humidity.date}
          source={this.props.indoor1_humidity.source}
          paletteColor={humidity}
          precision={0}
          unit="%"
          onClick={() => this.props.fetchMeasuredValue("indoor1_humidity")}
        />
        <ValueDisplay
          isFetched={this.props.indoor2_pressure.isFetched}
          label="pressure"
          reading={this.props.indoor2_pressure.value}
          date={this.props.indoor2_pressure.date}
          source={this.props.indoor2_pressure.source}
          paletteColor={pressure}
          onClick={() => this.props.fetchMeasuredValue("indoor2_pressure")}
        />
      </Dashboard>
    );
  }

  public componentDidMount() {
    this.props.fetchMultipleMeasuredValues(["outdoor_temperature", "indoor2_temperature", "indoor1_humidity", "indoor2_pressure"]);
  }
  
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    outdoor_temperature: state.measuredValues.outdoor_temperature,
    indoor2_temperature: state.measuredValues.indoor2_temperature,
    indoor1_humidity: state.measuredValues.indoor1_humidity,
    indoor2_pressure: state.measuredValues.indoor2_pressure,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions | ThunkAction<void, AppState, undefined, Actions>>): DispatchProps => {
  return {
    fetchMeasuredValue: (measuredValueName: MeasuredValuesNames) => dispatch(fetchSingleMeasuredValue(measuredValueName)),
    fetchMultipleMeasuredValues: (measuredValueNames: MeasuredValuesNames[]) => dispatch(fetchMultipleMeasuredValues(measuredValueNames))
  };
}

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardContainerConnected);
export default DashboardContainer;
