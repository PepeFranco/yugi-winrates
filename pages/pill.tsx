import colours from "./data/colours.json";

const Pill = ({ children }) => {
  return (
    <div
      style={{
        height: "60px",
        background: colours.theme.primary,
        width: "100%",
        color: colours.theme.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        marginTop: "10px",
      }}
    >
      <span
        style={{
          width: "90%",
          textAlign: "center",
          color: colours.theme.white,
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default Pill;
