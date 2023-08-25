import Link from "next/link";
import DeckBlock from "./deckBlock";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderColor: "#F17E82",
        borderLeftWidth: "1px",
        borderLeftStyle: "solid",
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderRightWidth: "5px",
        borderRightStyle: "solid",
        borderBottomWidth: "5px",
        borderBottomStyle: "solid",
        borderRadius: "15px",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
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
