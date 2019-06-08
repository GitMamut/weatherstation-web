import React from "react";
import WrappedText from "./WrappedText";
import WrappedInsideText from "./WrappedInsideText";
import moment, { Moment } from "moment";

type Props = {
  label: string;
  reading: number;
  date?: Moment;
  unit?: string;
  precision?: number;
  isFetched: boolean;
  paletteColor: (isFetched: boolean, reading: number) => string;
  onClick: () => void;
};

const ValueDisplay = (props: Props) => (
  <div className="visualDisplay__container" onClick={props.onClick}>
    <WrappedText isFetched={props.isFetched}>
      {props.label}
    </WrappedText>
    <WrappedInsideText isFetched={props.isFetched}>
      {props.date ?  props.date.format("DD/MM HH:mm"): ""}
    </WrappedInsideText>
    <div className="visualDisplay_circle" style={{ backgroundColor: props.paletteColor(props.isFetched, props.reading) }}>
      {props.isFetched ? "..." : formatValue(props)}
    </div>
  </div>
);

const formatValue = (props: Props): string => {
  return props.reading.toFixed(props.precision !== undefined ? props.precision : 1)
    + (props.unit ? props.unit : "");
}

export default ValueDisplay;