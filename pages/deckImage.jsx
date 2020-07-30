const DeckImage = ({ code }) => (
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

export default DeckImage;
