import Link from "next/link";
const Header = () => (
  <div
    style={{
      width: "100%",
      position: "-webkit - sticky",
      position: "sticky",
      top: 0,
      height: "100px",
      background: "black",
      padding: "10px 100px",
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
