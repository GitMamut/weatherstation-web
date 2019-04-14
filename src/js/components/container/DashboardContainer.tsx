import React, { Dispatch } from "react";
import ValueDisplay from "../presentational/ValueDisplay";
import { connect } from "react-redux";
import { Actions } from "../../constants/action-types";
import { AppState, MeasuredValueIndicator } from "../../redux/rootReducer";
import { fetchMeasuredValue } from "../../redux/actions";
import { ThunkAction } from "redux-thunk";
import { MeasuredValuesNames } from "../../types";
import Dashboard from "../presentational/Dashboard";

type DispatchProps = {
  fetchMeasuredValue: (measuredValueName: MeasuredValuesNames) => void
};

type StateProps = {
  outdoor_temperature: MeasuredValueIndicator,
  indoor1_temperature: MeasuredValueIndicator,
};

type Props = StateProps & DispatchProps;

type State = {};

class FormContainerConnected extends React.Component<Props, State> {
  public render() {
    return (
      <Dashboard>
        <ValueDisplay
          isFetched={this.props.outdoor_temperature.isFetched}
          label="temperature outdoor"
          reading={this.props.outdoor_temperature.value}
          onClick={() => this.props.fetchMeasuredValue("outdoor_temperature")}
        />
        <ValueDisplay
          isFetched={this.props.indoor1_temperature.isFetched}
          label="temperature indoor"
          reading={this.props.indoor1_temperature.value}
          onClick={() => this.props.fetchMeasuredValue("indoor1_temperature")}
        />
      </Dashboard>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    outdoor_temperature: state.measuredValues.outdoor_temperature,
    indoor1_temperature: state.measuredValues.indoor1_temperature,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions | ThunkAction<void, AppState, undefined, Actions>>): DispatchProps => {
  return {
    fetchMeasuredValue: (measuredValueName: MeasuredValuesNames) => dispatch(fetchMeasuredValue(measuredValueName))
  };
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerConnected);
export default FormContainer;
