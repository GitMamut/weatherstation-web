import React from "react";
import "./styles.css"

type Props = {

};

class Dashboard extends React.PureComponent<Props> {
  render() {
    return (
      <div className="dashboard__container">
        {this.props.children}
      </div>)
  };
};

export default Dashboard;