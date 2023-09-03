import colours from "./data/colours.json";

const Dropdown = ({ children, onChange, value }) => {
  return (
    <select
      style={{
        width: "150px",
        height: "30px",
        borderRadius: "10px",
        background: colours.theme.primary,
        color: colours.theme.white,
        border: "none",
      }}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
  );
};

export default Dropdown;
