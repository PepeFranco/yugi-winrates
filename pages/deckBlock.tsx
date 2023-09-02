import Link from "next/link";
import Card from "./card";
import colours from "./data/colours.json";
import { Deck } from "../types";

const DeckBlock = ({ code, name, type, year }: Deck) => {
  return (
    <Card
      style={{
        width: "88px",
        marginBottom: "20px",
        margin: "10px",
      }}
    >
      <div
        style={{ height: "120px", position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            height: "30px",
            width: "60px",
            position: "absolute",
            right: 0,
            top: 0,
            background: colours.theme.primary,
            color: colours.theme.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            borderBottomRightRadius: "0px",
            zIndex: 10,
          }}
        >
          {year}
        </div>
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            position: "relative",
          }}
        >
          <img
            style={{
              // top: 0,
              height: "90%",
              width: "auto",
              position: "absolute",
            }}
            src={`/${type}/${code}.jpg`}
          ></img>
        </div>
      </div>
      <div style={{ height: "50px" }}>
        <Link
          href={`/deck/${code}?type=${type}`}
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              background: colours.theme.primary,
              height: "100%",
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
                fontSize: "10pt",
              }}
            >
              {name}
            </span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default DeckBlock;
