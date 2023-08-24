import Link from "next/link";

const footerHeight = "50px";

const Footer = () => (
  <div
    style={{
      width: "100%",
      background: "#F17E82",
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
      <Link href="/records" style={{ color: "white" }}>
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
      <Link href="/decks" style={{ color: "white" }}>
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

export default Footer;
