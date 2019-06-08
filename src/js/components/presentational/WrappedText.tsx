import React from "react";
import "./styles.css"

type Props = {
  isFetched: boolean;
};

class WrappedText extends React.PureComponent<Props> {
  render() {
    return (
      <svg width="360" height="360" className={this.props.isFetched ? "animated" : "frozen"} viewBox="-20 -20 360 360" >
        {/* <circle cx="180" cy="180" r="180" fill="red"/> */}
        <path 
          id="curve"
          fill="transparent"
          d="
            M 0, 180
            a 180,180 0 1,1 360,0
            a 180,180 0 1,1 -0,0"         
          />
          <desc>
            M (CX - R), CY
            a R,R 0 1,0 (R * 2),0
            a R,R 0 1,0 -(R * 2),0
          </desc>
        <text fill="gray">
          <textPath xlinkHref="#curve">
            {this.props.children}
          </textPath>
        </text>
      </svg>)
  };
};

export default WrappedText;