import Link from "next/link";
import DeckBlock from "./deckBlock";
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <DeckBlock code={deckCode} name={deckName} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WinRatePieChart
            totalGames={totalGames}
            winPercentage={winPercentage}
            lossPercentage={lossPercentage}
            winColor={deckColor}
            lossColor={opponentDeckColor}
            wins={wins}
            losses={losses}
          />
        </div>
        <DeckBlock code={opponentDeckCode} name={opponentDeckName} />
      </div>
    </div>
  );
};
