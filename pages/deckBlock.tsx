import Link from "next/link";
import Card from "./card";
import colours from "./data/colours.json";
import { Deck } from "../types";

const DeckBlock = ({ code, name, type, year }: Deck) => {
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
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            height: "30px",
            background: colours.theme.primary,
            width: "100%",
            color: colours.theme.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <span
            style={{
              width: "90%",
              textAlign: "center",
              color: colours.theme.white,
            }}
          >
            {year}
          </span>
        </div>
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
              height: "80%",
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
