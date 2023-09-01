import Image from "next/image";
import Link from "next/link";
import logo from "../public/yugioh-logo.png";
import { useRouter } from "next/router";
import { useDefaultType } from "../hooks/useDefaultType";
import colours from "./data/colours.json";

const Header = () => {
  const router = useRouter();
  const { type } = router.query;

  useDefaultType();

  return (
    <div
      style={{
        width: "100%",
        position: "-webkit - sticky",
        position: "sticky",
        top: 0,
        background: colours.theme.primary,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 100,
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
        <Link href={`/?type=${type}`} style={{ color: colours.theme.white }}>
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
            />
            <span>Structure Decks Winrates</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
