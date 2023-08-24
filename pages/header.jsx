import Image from "next/image";
import Link from "next/link";
import logo from "../public/yugioh-logo.png";

const Header = () => (
  <div
    style={{
      width: "100%",
      position: "-webkit - sticky",
      position: "sticky",
      top: 0,
      background: "#F17E82",
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
      <Link href="/" style={{ color: "white" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Image
            src={logo}
            alt="logo"
            style={{ height: "75%", width: "auto", margin: "10px" }}
            // width={500} automatically provided
            // height={500} automatically provided
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
          <span>Structure Decks Winrates</span>
        </div>
      </Link>
    </div>
  </div>
);

export default Header;
