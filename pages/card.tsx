import React from "react";
import colours from "./data/colours.json";

type CardProps = React.PropsWithChildren<{
  style?: Record<string, string>;
}>;

const Card = ({ children, style }: CardProps) => {
  return (
    <div
      style={{
        background: colours.theme.white,
        borderColor: colours.theme.primary,
        borderStyle: "solid",
        borderRightWidth: "5px",
        borderBottomWidth: "5px",
        borderLeftWidth: "1px",
        borderTopWidth: "1px",
        borderRadius: "15px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
