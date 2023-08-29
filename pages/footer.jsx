import Link from "next/link";
import { useRouter } from "next/router";
import { useDefaultType } from "../hooks/useDefaultType";
import colours from "./data/colours.json";

const footerHeight = "50px";

const Footer = () => {
  const router = useRouter();
  const { type } = router.query;

  useDefaultType();

  return (
    <div
      style={{
        width: "100%",
        background: colours.theme.primary,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          maxWidth: "900px",
          color: "white",
        }}
      >
        <Link href={`/records?type=${type}`} style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: footerHeight,
            }}
          >
            <span>All records</span>
          </div>
        </Link>
        <Link href={`/decks?type=${type}`} style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: footerHeight,
            }}
          >
            <span>All decks</span>
          </div>
        </Link>
        <a
          href="https://github.com/PepeFranco/yugi-winrates"
          style={{ color: "white" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: footerHeight,
            }}
          >
            <span>Source code</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
