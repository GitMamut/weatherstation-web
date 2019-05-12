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
import { temperature } from "../../constants/palettes";

type DispatchProps = {
  fetchMeasuredValue: (measuredValueName: MeasuredValuesNames) => void,
  fetchMultipleMeasuredValues: (measuredValueNames: MeasuredValuesNames[]) => void
};

type StateProps = {
  outdoor_temperature: MeasuredValueIndicator,
  indoor2_temperature: MeasuredValueIndicator,
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
          paletteColor={temperature}
          onClick={() => this.props.fetchMeasuredValue("outdoor_temperature")}
        />
        <ValueDisplay
          isFetched={this.props.indoor2_temperature.isFetched}
          label="indoor"
          reading={this.props.indoor2_temperature.value}
          paletteColor={temperature}
          onClick={() => this.props.fetchMeasuredValue("indoor2_temperature")}
        />
      </Dashboard>
    );
  }

  public componentDidMount() {
    this.props.fetchMultipleMeasuredValues(["outdoor_temperature", "indoor2_temperature"]);
  }
  
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    outdoor_temperature: state.measuredValues.outdoor_temperature,
    indoor2_temperature: state.measuredValues.indoor2_temperature,
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
