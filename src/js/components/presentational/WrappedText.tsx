import React from "react";
import "./styles.css"

type Props = {
  isFetched: boolean;
};

class WrappedText extends React.PureComponent<Props> {
  render() {
    const cx = 200;
    const cy = 200;
    const r = 180;

    return (
      <svg width="400" height="400" className={this.props.isFetched ? "animated" : "frozen"} viewBox="0 0 400 400" >
        {/* <circle cx={cx} cy={cy} r={r} fill="red"/> */}
        <path 
          id="curve"
          fill="transparent"
          d={`
            M ${cx -r}, ${cy}
            a ${r},${r} 0 1,1 ${r*2},0
            a ${r},${r} 0 1,1 -0,0`}
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