import React from "react";
import "./styles.css"

type Props = {
  isFetched: boolean;
};

class WrappedInsideText extends React.PureComponent<Props> {
  render() {
    const cx = 200;
    const cy = 200;
    const r = 150;

    return (
      <svg width="400" height="400" className={"date"} viewBox="0 0 400 400" >
        {/* <circle cx={cx} cy={cy} r={r} fill="red"/> */}
        <path 
          id="insideCurve"
          fill="transparent"
          d={`
            M ${cx -r}, ${cy}
            a ${r},${r} 0 1,0 ${r*2},0
            a ${r},${r} 0 1,0 -${r*2},0`}
          />
          <desc>
            M (CX - R), CY
            a R,R 0 1,0 (R * 2),0
            a R,R 0 1,0 -(R * 2),0
          </desc>
        <text fill="black">
          <textPath xlinkHref="#insideCurve">
            {this.props.children}
          </textPath>
        </text>
      </svg>)
  };
};

export default WrappedInsideText;