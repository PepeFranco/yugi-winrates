const DeckImage = ({ code }) => (
  <div style={{ width: "100px", justifyContent: "center", display: "flex" }}>
    <img
      style={{
        height: "100px",
      }}
      src={`/${code}.jpg`}
    ></img>
  </div>
);

export default DeckImage;
