import Link from "next/link";
import Counter from "./counter";
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
        }}
      >
        <Link href={`/deck/${deckCode}`}>
          <a>
            <h3>{deckName}</h3>
          </a>
        </Link>
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#" style={{ textAlign: "right" }}>
            <h3>{opponentDeckName}</h3>
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
        <Counter>{wins}</Counter>
        <WinRatePieChart
          totalGames={totalGames}
          winPercentage={winPercentage}
          lossPercentage={lossPercentage}
          winColor={deckColor}
          lossColor={opponentDeckColor}
        />
        <Counter>{losses}</Counter>
        <Link href={`/deck/${opponentDeckCode}`}>
          <a href="#">
            <DeckImage code={opponentDeckCode} />
          </a>
        </Link>
      </div>
    </div>
  );
};
