import React from "react";

type Props = {
  label: string;
  reading: number;
  isFetched: boolean;
  onClick: () => void;
};

const ValueDisplay = (props: Props) => (
  <div style={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={props.onClick}>
    <p>{props.isFetched ? "..." : props.reading}</p>
    <p>{props.label}</p>
  </div>
);

export default ValueDisplay;