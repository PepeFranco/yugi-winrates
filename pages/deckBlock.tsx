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
          margin: "2px",
          // border: "none",
          width: "100px",
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "0px",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
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
            zIndex: 10,
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              // height: "90%",
              // width: "auto",
              top: "-4px",
              width: "125px",
              // left: "-10px",
              position: "absolute",
              overflow: "hidden",
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
            zIndex: 10,
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
