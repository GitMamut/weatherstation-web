import React from "react";

type Props = {

};

class Dashboard extends React.PureComponent<Props> {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {this.props.children}
      </div>)
  };
};

export default Dashboard;