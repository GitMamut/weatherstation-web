import React from "react";
import WrappedText from "./WrappedText";
import WrappedInsideText from "./WrappedInsideText";
import moment, { Moment } from "moment";
import { Source } from "../../types";
import "./styles.css"

type Props = {
  label: string;
  reading: number;
  date?: Moment;
  source: Source;
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
      {formatDateAndSource(props.date, props.source)}
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

const formatDateAndSource = (date: Moment | undefined, source: Source): string => {
  if (date) {
    return date.format("ddd, DD MMM HH:mm") + " " + getSourceIndicator(source);
  }
  return "";
}

const getSourceIndicator = (source: Source): string => {
  switch (source) {
    case Source.live:
      return "LIVE";
    case Source.merger:
      return "MRGR";
    case Source.database:
      return "DB";
    default:
      return "";
  }
}

export default ValueDisplay;