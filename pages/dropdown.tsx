import React, { ChangeEventHandler } from "react";
import colours from "./data/colours.json";

type DropdownProps = React.PropsWithChildren<{
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  name?: string;
}>;

const Dropdown = ({ children, onChange, value, name }: DropdownProps) => {
  return (
    <select
      style={{
        width: "150px",
        height: "100%",
        borderRadius: "10px",
        background: colours.theme.primary,
        color: colours.theme.white,
        border: "none",
      }}
      onChange={onChange}
      value={value}
      name={name}
    >
      {children}
    </select>
  );
};

export default Dropdown;
