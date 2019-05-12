import React from "react";

type Props = {
  label: string;
  reading: number;
  unit?: string;
  precision?: number;
  isFetched: boolean;
  paletteColor: (isFetched: boolean, reading: number) => string;
  onClick: () => void;
};

const ValueDisplay = (props: Props) => (
  <div className="visualDisplay__container" onClick={props.onClick}>
    <div className="visualDisplay_circle" style={{backgroundColor: props.paletteColor(props.isFetched, props.reading)}}>
        {props.isFetched ? "..." : props.reading.toFixed(props.precision ? props.precision : 1)}
    </div>
    <p>{props.label}</p>
  </div>
);

export default ValueDisplay;