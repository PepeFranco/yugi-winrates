const DeckBlock = ({ code, name }) => {
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
        width: "130px",
        margin: "10px",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          height: "180px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          marginBottom: "5px",
        }}
      >
        <img
          style={{
            maxHeight: "90%",
            maxWidth: "90%",
          }}
          src={`/${code}.jpg`}
        ></img>
      </div>
      <div
        style={{
          height: "60px",
          background: "#F17E82",
          width: "100%",
          color: "white",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ width: "90%", textAlign: "center" }}>{name}</span>
      </div>
    </div>
  );
};

export default DeckBlock;
