const DeckImage = ({ code }) => (
  <div
    style={{
      width: "150px",
      justifyContent: "center",
      display: "flex",
      cursor: "pointer",
    }}
  >
    <img
      style={{
        height: "150px",
      }}
      src={`/${code}.jpg`}
    ></img>
  </div>
);

export default DeckImage;
