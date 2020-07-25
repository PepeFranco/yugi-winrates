import Link from "next/Link";
const Header = () => (
  <div
    style={{
      width: "100%",
      position: "-webkit - sticky",
      position: "sticky",
      top: 0,
      height: "100px",
      background: "black",
      padding: "20px",
    }}
  >
    <Link href="/">
      <a href="#" style={{ color: "white" }}>
        <h1>Yu-gi-oh! Structure Decks Winrates</h1>
      </a>
    </Link>
  </div>
);

export default Header;
