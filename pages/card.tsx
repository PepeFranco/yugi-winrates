import React from "react";

type CardProps = React.PropsWithChildren<{
  style?: Record<string, string>;
}>;

const Card = ({ children, style }: CardProps) => {
  return (
    <div
      style={{
        borderColor: "#F17E82",
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
