import Link from "next/link";

const footerHeight = "50px";

const Footer = () => (
  <div
    style={{
      width: "100%",
      position: "-webkit - sticky",
      position: "sticky",
      bottom: 0,
      background: "black",
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
      }}
    >
      <Link href="/records">
        <a href="#" style={{ color: "white" }}>
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
        </a>
      </Link>
      <Link href="/decks">
        <a href="#" style={{ color: "white" }}>
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
        </a>
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

export default Footer;
