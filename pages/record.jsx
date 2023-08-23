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
        <Link href={`/deck/${deckCode}`} style={{ color: "black" }}>
          {deckName}
        </Link>
        <Link
          href={`/deck/${opponentDeckCode}`}
          style={{ textAlign: "right", color: "black" }}>

          {opponentDeckName}

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

          <DeckImage code={deckCode} />

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

          <DeckImage code={opponentDeckCode} />

        </Link>
      </div>
    </div>
  );
};
