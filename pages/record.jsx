import DeckBlock from "./deckBlock";
import WinRatePieChart from "./winRatePieChart";
import Card from "./card";

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
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
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
    </Card>
  );
};
