import React from "react";

type Props = {
  label: string;
  text: string; 
  type: string; 
  id: string; 
  value: string; 
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => (
  <div className="form-group">
    <label htmlFor={props.label}>{props.text}:{" "}</label>
    <input
      type={props.type}
      className="form-control"
      id={props.id}
      value={props.value}
      onChange={props.handleChange}
      required
    />
  </div>
);

export default Input;