import colours from "./data/colours.json";

const Pill = ({ children }) => {
  return (
    <div
      style={{
        height: "40px",
        background: colours.theme.primary,
        width: "100%",
        color: colours.theme.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
      }}
    >
      <span
        style={{
          width: "100%",
          textAlign: "center",
          padding: "10px",
          fontSize: "8pt",
          color: colours.theme.white,
        }}
      >
        {children}
      </span>
    </div>
  );
};

export default Pill;
