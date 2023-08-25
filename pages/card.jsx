const Card = ({ children, style }) => {
  return (
    <div
      style={{
        borderColor: "#F17E82",
        borderRightWidth: "5px",
        borderRightStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftStyle: "solid",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderRadius: "15px",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
