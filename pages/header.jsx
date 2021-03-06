import Link from "next/link";
const Header = () => (
  <div
    style={{
      width: "100%",
      position: "-webkit - sticky",
      position: "sticky",
      top: 0,
      background: "black",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "900px",
        width: "100%",
      }}
    >
      <Link href="/">
        <a href="#" style={{ color: "white" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100px",
            }}
          >
            <img src="/logo.webp" style={{ height: "100%" }} />
            <span>Structure Decks Winrates</span>
          </div>
        </a>
      </Link>
    </div>
  </div>
);

export default Header;
