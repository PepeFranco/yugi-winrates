import Link from "next/link";
import DeckImage from "./deckImage";
import WinRatePieChart from "./winRatePieChart";

export default ({
  wins,
  losses,
  totalGames,
  winPercentage,
  lossPercentage,
  opponentDeckName,
  opponentDeckCode,
  deckCode,
  deckName,
  deckColor,
  opponentDeckColor,
}) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        <Link href={`/deck/${deckCode}`}>
          <a style={{ color: "black" }}>{deckName}</a>
        </Link>
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#" style={{ textAlign: "right", color: "black" }}>
            {opponentDeckName}
          </a>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link href={`/deck/${deckCode}`}>
          <a>
            <DeckImage code={deckCode} />
          </a>
        </Link>
        <WinRatePieChart
          totalGames={totalGames}
          winPercentage={winPercentage}
          lossPercentage={lossPercentage}
          winColor={deckColor}
          lossColor={opponentDeckColor}
          wins={wins}
          losses={losses}
        />
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#">
            <DeckImage code={opponentDeckCode} />
          </a>
        </Link>
      </div>
    </div>
  );
};
