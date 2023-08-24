import Link from "next/link";

const DeckBlock = ({ code, name }) => {
  return (
    <Link href={`/deck/${code}`} legacyBehavior>
      <div
        style={{
          borderColor: "#F17E82",
          borderRightWidth: "5px",
          borderRightStyle: "solid",
          borderLeftWidth: "1px",
          borderLeftStyle: "solid",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderRadius: "15px",
          width: "130px",
          maxWidth: "25vw",
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "0px",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            height: "180px",
            maxHeight: "15vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            marginBottom: "5px",
            overflow: "hidden",
          }}
        >
          <img
            style={{
              height: "90%",
              width: "auto",
            }}
            src={`/${code}.jpg`}
          ></img>
        </div>
        <div
          style={{
            height: "60px",
            background: "#F17E82",
            width: "100%",
            color: "white",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ width: "90%", textAlign: "center" }}>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default DeckBlock;
