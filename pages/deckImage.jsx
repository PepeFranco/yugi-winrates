const DeckImage = ({ code, size }) => {
  if (size === "large") {
    return <img src={`/${code}.jpg`}></img>;
  }
  return (
    <div
      style={{
        maxWidth: "150px",
        justifyContent: "center",
        display: "flex",
        cursor: "pointer",
      }}
    >
      <img
        style={{
          maxHeight: "150px",
        }}
        src={`/${code}.jpg`}
      ></img>
    </div>
  );
};

export default DeckImage;
