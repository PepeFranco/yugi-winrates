import Link from "next/link";

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
        justifyContent: "space-between",
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
              height: "50px",
            }}
          >
            <h4>All records</h4>
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
              height: "50px",
            }}
          >
            <h4>All decks</h4>
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
            height: "50px",
          }}
        >
          <h4>Source code</h4>
        </div>
      </a>
    </div>
  </div>
);

export default Footer;
