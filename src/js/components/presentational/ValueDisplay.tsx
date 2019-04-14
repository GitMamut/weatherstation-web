import React from "react";

type Props = {
  label: string;
  reading: number;
  isFetched: boolean;
  onClick: () => void;
};

const ValueDisplay = (props: Props) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <p>{props.reading}</p>
    <button onClick={props.onClick} disabled={props.isFetched}>{props.label}</button>
  </div>
);

export default ValueDisplay;