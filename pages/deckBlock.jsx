import Link from "next/link";
import Card from "./card";
import colours from "./data/colours.json";

const DeckBlock = ({ code, name, type }) => {
  return (
    <Link
      href={`/deck/${code}?type=${type}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        style={{
          width: "130px",
          maxWidth: "25vw",
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "0px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            height: "180px",
            maxHeight: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            marginBottom: "5px",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              height: "90%",
              width: "auto",
            }}
            src={`/${type}/${code}.jpg`}
          ></img>
        </div>
        <div
          style={{
            height: "60px",
            background: colours.theme.primary,
            width: "100%",
            color: colours.theme.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: "10px",
          }}
        >
          <span
            style={{
              width: "90%",
              textAlign: "center",
              color: colours.theme.white,
            }}
          >
            {name}
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default DeckBlock;
